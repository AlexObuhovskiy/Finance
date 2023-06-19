using System.ComponentModel.DataAnnotations;

namespace Finance.DataModel.Entities;

#pragma warning disable CS8618

public class StockInfo
{
    [Key]
    public Guid Id { get; set; }
    public string TickerName { get; set; }
    public decimal PurchasePrice { get; set; }
    public DateTime PurchaseDate { get; set; }
    public decimal Quantity { get; set; }
}