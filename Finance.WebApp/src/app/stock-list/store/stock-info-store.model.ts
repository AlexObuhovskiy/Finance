import { StockInfoDto } from "./stock-info-dto.model";

export interface StockInfoStoreModel {
  stockInfos: StockInfoDto[],
  totalPurchasePrice: number
}
