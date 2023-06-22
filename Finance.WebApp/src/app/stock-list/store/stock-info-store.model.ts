import { GroupedStockInfo } from "src/app/models/grouped-stock-info.model";
import { StockInfoDto } from "../../models/stock-info-dto.model";

export interface StockInfoStoreModel {
  stockInfos: StockInfoDto[],
  groupedStockInfos: GroupedStockInfo[],
  totalPurchasePrice: number
}
