using System.ComponentModel.DataAnnotations;
#pragma warning disable CS8618

namespace Finance.DataModel.Entities;

public class StockMarketInfo
{
    [Key]
    public Guid Id { get; set; }
    public string TickerName { get; set; }
    public decimal Price { get; set; }
    public DateTime UpdateDate { get; set; }
}
