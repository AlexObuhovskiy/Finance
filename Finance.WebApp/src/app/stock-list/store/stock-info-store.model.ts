import { GroupedStockInfo } from "src/app/models/grouped-stock-info.model";
import { StockInfoDto } from "../../models/stock-info-dto.model";
import { CurrentStockPrice } from "src/app/models/current-stock-price.model";

export interface StockInfoStoreModel {
  stockInfos: StockInfoDto[],
  groupedStockInfos: GroupedStockInfo[],
  currentStockPrices: CurrentStockPrice[],
  totalPurchasePrice: number
}
