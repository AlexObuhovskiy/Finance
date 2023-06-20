using System.ComponentModel.DataAnnotations;

#pragma warning disable CS8618
namespace Finance.Api.Dto.StockInfo;

public class StockInfoDto
{
    [Required]
    public string TickerName { get; set; }

    [Required]
    public decimal PurchasePrice { get; set; }
    
    [Required]
    public DateTime PurchaseDate { get; set; }
    
    [Required]
    public decimal Quantity { get; set; }
}