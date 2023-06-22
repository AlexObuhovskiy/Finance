#pragma warning disable CS8618
namespace Finance.Api.Dto.GoogleSheets;

public class StocksPriceResponseDto
{
    public StocksPriceResponseDto()
    {
        StockPrices = new List<CurrentStockPrice>();
    }

    public List<CurrentStockPrice> StockPrices { get; set; }
}
