using System.Globalization;
using Finance.Api.Dto.GoogleSheets;
using Finance.Api.Options;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Util.Store;
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

    public GoogleSheetsService(IOptions<GoogleSheetsOptions> googleSheetsOptions)
    {
        _googleSheetsOptions = googleSheetsOptions;
    }

    public async Task<StocksPriceResponseDto> GetRealStockPrices()
    {
        using var sheetsService = await GetSheetsService();
        var getRequest = sheetsService.Spreadsheets.Values.Get(
            _googleSheetsOptions.Value.SpreadSheetId,
            RangeToTake);

        System.Net.ServicePointManager.ServerCertificateValidationCallback =
            (_, _, _, _) => true;

        var getResponse = await getRequest.ExecuteAsync();
        var response = getResponse.Values;

        var result = new StocksPriceResponseDto();
        foreach (IList<object> row in response.Skip(1))
        {
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
                continue;
            }

            result.StockPrices.Add(new CurrentStockPrice
            {
                TickerName = tickerName,
                Price = price
            });
        }

        return result;
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
