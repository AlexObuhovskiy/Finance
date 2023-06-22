#pragma warning disable CS8618
namespace Finance.Api.Dto.GoogleSheets;

public class CurrentStockPrice
{
    public string TickerName { get; set; }
    public decimal Price { get; set; }
}
