using Finance.Api.Dto.StockInfo;
using Finance.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Finance.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StockInfoController : ControllerBase
{
    private readonly IStockInfoService _stockInfoService;

    public StockInfoController(IStockInfoService stockInfoService)
    {
        _stockInfoService = stockInfoService;
    }

    [HttpGet]
    public async Task<IActionResult> GetStockInfos()
    {
        var stockInfos = await _stockInfoService.GetStockInfosAsync();
        
        return Ok(stockInfos);
    }

    [HttpGet("{id:Guid}")]
    public async Task<IActionResult> GetStockInfo(Guid id)
    {
        var stockInfo = await _stockInfoService.GetStockInfoAsync(id);

        if (stockInfo == null)
        {
            return NotFound();
        }

        return Ok(stockInfo);
    }

    [HttpPost]
    public async Task<IActionResult> CreateStockInfo(StockInfoDto stockInfo)
    {
        var id = await _stockInfoService.CreateStockInfoAsync(stockInfo);

        return CreatedAtAction(nameof(GetStockInfo), new { id }, stockInfo);
    }

    [HttpPut("{id:Guid}")]
    public async Task<IActionResult> UpdateStockInfo(
        Guid id,
        StockInfoDto updatedStockInfo)
    {
        var success =
            await _stockInfoService.UpdateStockInfoAsync(id, updatedStockInfo);

        if (!success)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id:Guid}")]
    public async Task<IActionResult> DeleteStockInfo(Guid id)
    {
        var success = await _stockInfoService.DeleteStockInfoAsync(id);

        if (!success)
        {
            return NotFound();
        }

        return NoContent();
    }
}