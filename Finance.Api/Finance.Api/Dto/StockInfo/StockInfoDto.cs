#pragma warning disable CS8618
namespace Finance.Api.Dto.StockInfo;

public class StockInfoDto
{
    public string TickerName { get; set; }
    public decimal PurchasePrice { get; set; }
    public DateTime PurchaseDate { get; set; }
    public decimal Quantity { get; set; }
}