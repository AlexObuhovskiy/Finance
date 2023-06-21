export interface StockInfoResponseDto extends StockInfoDto {
  id: string;
}

export interface StockInfoDto {
  tickerName: string;
  purchasePrice: number;
  quantity: number;
  purchaseDate: Date;
}
