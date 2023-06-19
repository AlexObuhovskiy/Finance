using AutoMapper;
using Finance.Api.Dto.StockInfo;
using Finance.DataModel.DataAccess;
using Finance.DataModel.Entities;
using Microsoft.EntityFrameworkCore;

namespace Finance.Api.Services;

public interface IStockInfoService
{
    Task<List<StockInfoResponseDto>> GetStockInfosAsync();
    Task<StockInfoResponseDto?> GetStockInfoAsync(Guid id);
    Task<Guid> CreateStockInfoAsync(StockInfoDto stockInfoDto);
    Task<bool> UpdateStockInfoAsync(Guid id, StockInfoDto updatedStockInfo);
    Task<bool> DeleteStockInfoAsync(Guid id);
}

public class StockInfoService : IStockInfoService
{
    private readonly DataContext _dbContext;
    private readonly IMapper _mapper;

    public StockInfoService(DataContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<List<StockInfoResponseDto>> GetStockInfosAsync()
    {
        var stockInfos = await _dbContext.Set<StockInfo>().ToListAsync();

        return _mapper.Map<List<StockInfoResponseDto>>(stockInfos);
    }

    public async Task<StockInfoResponseDto?> GetStockInfoAsync(Guid id)
    {
        var stockInfo = await _dbContext.Set<StockInfo>().FindAsync(id);
        if (stockInfo is null)
        {
            return null;
        }

        return _mapper.Map<StockInfoResponseDto>(stockInfo);
    }

    public async Task<Guid> CreateStockInfoAsync(StockInfoDto stockInfoDto)
    {
        var stockInfo = _mapper.Map<StockInfo>(stockInfoDto);
        await _dbContext.Set<StockInfo>().AddAsync(stockInfo);
        await _dbContext.SaveChangesAsync();

        return stockInfo.Id;
    }

    public async Task<bool> UpdateStockInfoAsync(Guid id, StockInfoDto updatedStockInfo)
    {
        var stockInfo = await _dbContext.Set<StockInfo>().FindAsync(id);

        if (stockInfo == null)
        {
            return false;
        }

        _mapper.Map(updatedStockInfo, stockInfo);

        await _dbContext.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteStockInfoAsync(Guid id)
    {
        var stockInfo = await _dbContext.Set<StockInfo>().FindAsync(id);

        if (stockInfo == null)
        {
            return false;
        }

        _dbContext.Set<StockInfo>().Remove(stockInfo);
        await _dbContext.SaveChangesAsync();

        return true;
    }
}
