using Finance.Api.Dto.GoogleSheets;
using Finance.Api.Dto.StockInfo;
using Finance.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Finance.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GoogleSheetsController : ControllerBase
{
    private readonly IGoogleSheetsService _googleSheetsService;

    public GoogleSheetsController(IGoogleSheetsService googleSheetsService)
    {
        _googleSheetsService = googleSheetsService;
    }

    [HttpGet]
    public async Task<IActionResult> GetRealStockPrices()
    {
        var result = await _googleSheetsService.GetRealStockPrices();

        return Ok(result);
    }
}