using System.Globalization;
using AutoMapper;
using Finance.Api.Dto.GoogleSheets;
using Finance.Api.Options;
using Finance.DataModel.DataAccess;
using Finance.DataModel.Entities;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Util.Store;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Finance.Api.Services;

public interface IGoogleSheetsService
{
    Task<StocksPriceResponseDto> GetRealStockPrices();
}

public class GoogleSheetsService : IGoogleSheetsService
{
    private const string RangeToTake = "data1!A:B";
    private const string ApplicationName = "Desktop client 1";
    private const string User = "user";
    private const string DoNotGetCultureInfo = "no";
    private const string FolderName = "MyAppsToken";

    private readonly IOptions<GoogleSheetsOptions> _googleSheetsOptions;
    private readonly DataContext _dbContext;
    private readonly IMapper _mapper;

    public GoogleSheetsService(
        IOptions<GoogleSheetsOptions> googleSheetsOptions,
        DataContext dbContext, IMapper mapper)
    {
        _googleSheetsOptions = googleSheetsOptions;
        _dbContext = dbContext;
        _mapper = mapper;

        System.Net.ServicePointManager.ServerCertificateValidationCallback =
            (_, _, _, _) => true;
    }

    public async Task<StocksPriceResponseDto> GetRealStockPrices()
    {
        using var sheetsService = await GetSheetsService();
        var getRequest = sheetsService.Spreadsheets.Values.Get(
            _googleSheetsOptions.Value.SpreadSheetId,
            RangeToTake);

        var response = await getRequest.ExecuteAsync();

        var result = new StocksPriceResponseDto();
        if (response.Values.Count < 2)
        {
            return result;
        }

        foreach (IList<object> row in response.Values.Skip(1))
        {
            var currentStockPrice = GetCurrentStockPriceFromRow(row);
            if (currentStockPrice is null)
            {
                continue;
            }

            result.StockPrices.Add(currentStockPrice);
        }

        if (result.StockPrices.Any())
        {
            await UpdateStockPricesAsync(result.StockPrices);

            return result;
        }

        result.StockPrices = await GetSavedStockPrices();

        return result;
    }

    private async Task UpdateStockPricesAsync(List<CurrentStockPrice> currentStockPrices)
    {
        var allSavedPrices = await _dbContext.StockMarketInfos.ToListAsync();

        var toBeUpdated = allSavedPrices
            .Join(
                currentStockPrices,
                x => x.TickerName.ToLowerInvariant(),
                y => y.TickerName.ToLowerInvariant(),
                (savedStockMarketInfo, currentStockPrice) =>
                    new
                    {
                        savedStockMarketInfo,
                        currentStockPrice
                    })
            .Select(x =>
            {
                x.savedStockMarketInfo.Price = x.currentStockPrice.Price;

                return x.savedStockMarketInfo;
            })
            .ToList();

        _dbContext.StockMarketInfos.UpdateRange(toBeUpdated);

        var toBeAdded = currentStockPrices
            .Where(x => !allSavedPrices.Any(y =>
                string.Equals(x.TickerName, y.TickerName, StringComparison.InvariantCultureIgnoreCase)))
            .Select(x => _mapper.Map<StockMarketInfo>(x))
            .ToList();

        await _dbContext.StockMarketInfos.AddRangeAsync(toBeAdded);
        await _dbContext.SaveChangesAsync();
    }

    private async Task<List<CurrentStockPrice>> GetSavedStockPrices()
    {
        var allSavedPrices = await _dbContext.StockMarketInfos.ToListAsync();
        var result = allSavedPrices
            .Select(x => _mapper.Map<CurrentStockPrice>(x))
            .ToList();

        return result;
    }

    private static CurrentStockPrice? GetCurrentStockPriceFromRow(IList<object> row)
    {
        if (row.Count < 2)
        {
            return null;
        }

        var rowStrings = row.Select(y => y.ToString()).ToList();
        var tickerName = rowStrings[0];
        if (
            string.IsNullOrEmpty(tickerName) ||
            !decimal.TryParse(
                rowStrings[1],
                NumberStyles.Any,
                CultureInfo.GetCultureInfo(DoNotGetCultureInfo),
                out var price))
        {
            return null;
        }

        return new CurrentStockPrice
        {
            TickerName = tickerName,
            Price = price
        };
    }

    private async Task<SheetsService> GetSheetsService()
    {
        string[] scopes = { SheetsService.Scope.Spreadsheets };
        var httpClientInitializer = await GoogleWebAuthorizationBroker.AuthorizeAsync(
            new ClientSecrets
            {
                ClientId = _googleSheetsOptions.Value.ClientId,
                ClientSecret = _googleSheetsOptions.Value.ClientSecret
            },
            scopes,
            User,
            CancellationToken.None,
            new FileDataStore(FolderName)
        );

        var service = new SheetsService(new BaseClientService.Initializer()
        {
            HttpClientInitializer = httpClientInitializer,
            ApplicationName = ApplicationName
        });

        return service;
    }
}
