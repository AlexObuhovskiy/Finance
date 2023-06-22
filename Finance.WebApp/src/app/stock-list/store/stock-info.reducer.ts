import { createReducer, on } from "@ngrx/store";
import {
  createStockInfoAPISuccess,
  deleteStockInfoAPISuccess,
  stockInfosFetchAPISuccess,
  updateStockInfoAPISuccess
} from "./stock-info.action";
import { StockInfoStoreModel } from "./stock-info-store.model";
import { StockInfoDto } from "../../models/stock-info-dto.model";
import { GroupedStockInfo } from "src/app/models/grouped-stock-info.model";

export const initialState: Readonly<StockInfoStoreModel> = {
  stockInfos: [],
  groupedStockInfos: [],
  totalPurchasePrice: 0
};

export const stockInfoReducer = createReducer(
  initialState,
  on(stockInfosFetchAPISuccess, (state, { allStockInfos }) => {
    let newState = {
      ...state,
      stockInfos: allStockInfos,
      groupedStockInfos: getGroupStockInfos(allStockInfos),
      totalPurchasePrice: getTotalPurchaseSum(allStockInfos)
    }

    return newState;
  }),
  on(createStockInfoAPISuccess, (state, { newStockInfo }) => {
    let newState = { ...state, stockInfos: [...state.stockInfos] };
    newState.stockInfos.push(newStockInfo);
    newState.totalPurchasePrice = getTotalPurchaseSum(newState.stockInfos);
    newState.groupedStockInfos = getGroupStockInfos(newState.stockInfos);

    return newState;
  }),
  on(updateStockInfoAPISuccess, (state, { id, stockInfo }) => {
    let newState = { ...state, stockInfos: [...state.stockInfos] };
    const stockInfoIndex = newState.stockInfos.findIndex(x => x.id === id);
    newState.stockInfos[stockInfoIndex] = { ...stockInfo, id };
    newState.totalPurchasePrice = getTotalPurchaseSum(newState.stockInfos);
    newState.groupedStockInfos = getGroupStockInfos(newState.stockInfos);

    return newState;
  }),
  on(deleteStockInfoAPISuccess, (state, { id }) => {
    const newStockInfos = state.stockInfos.filter(x => x.id !== id);
    let newState = { ...state, stockInfos: newStockInfos };
    newState.totalPurchasePrice = getTotalPurchaseSum(newState.stockInfos)
    newState.groupedStockInfos = getGroupStockInfos(newState.stockInfos);

    return newState;
  })
);

function getTotalPurchaseSum(stockInfos: StockInfoDto[]) {
  return stockInfos.reduce(
    (sum, current) => sum + (current.purchasePrice * current.quantity),
    0
  );
}

function getGroupStockInfos(stockInfos: StockInfoDto[]) {
  let helper: any = {};
  let groupedStockInfos = stockInfos.reduce<GroupedStockInfo[]>(function (r, o) {
      var key = o.tickerName;
      if (!helper[key]) {
        helper[key] = Object.assign({ totalPrice: 0 }, o);
        r.push(helper[key]);
      }

      helper[key].totalPrice += o.quantity * o.purchasePrice;

      return r;
    }, []);

    return groupedStockInfos;
}