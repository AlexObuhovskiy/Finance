#pragma warning disable CS8618
namespace Finance.Api.Options;

public class GoogleSheetsOptions
{
    public string ClientId { get; set; }
    public string ClientSecret { get; set; }
    public string SpreadSheetId { get; set; }
}
