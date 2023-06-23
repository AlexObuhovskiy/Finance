export interface StockInfoDto {
  id: string;
  tickerName: string;
  purchasePrice: number;
  quantity: number;
  purchaseDate: Date;
  currentPrice?: number;
}
