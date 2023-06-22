import { createReducer, on } from "@ngrx/store";
import {
  createStockInfoAPISuccess,
  deleteStockInfoAPISuccess,
  stockInfosFetchAPISuccess,
  updateStockInfoAPISuccess
} from "./stock-info.action";
import { StockInfoStoreModel } from "./stock-info-store.model";
import { StockInfoDto } from "./stock-info-dto.model";

export const initialState: Readonly<StockInfoStoreModel> = {
  stockInfos: [],
  totalPurchasePrice: 0
};

export const stockInfoReducer = createReducer(
  initialState,
  on(stockInfosFetchAPISuccess, (state, { allStockInfos }) => {
    let newState = {
      ...state,
      stockInfos: allStockInfos,
      totalPurchasePrice: getTotalPurchaseSum(allStockInfos)
    }

    return newState;
  }),
  on(createStockInfoAPISuccess, (state, { newStockInfo }) => {
    let newState = { ...state, stockInfos: [...state.stockInfos] };
    newState.stockInfos.push(newStockInfo);
    newState.totalPurchasePrice = getTotalPurchaseSum(newState.stockInfos)

    return newState;
  }),
  on(updateStockInfoAPISuccess, (state, { id, stockInfo }) => {
    let newState = { ...state, stockInfos: [...state.stockInfos] };
    const stockInfoIndex = newState.stockInfos.findIndex(x => x.id === id);
    newState.stockInfos[stockInfoIndex] = { ...stockInfo, id };
    newState.totalPurchasePrice = getTotalPurchaseSum(newState.stockInfos)

    return newState;
  }),
  on(deleteStockInfoAPISuccess, (state, { id }) => {
    const newStockInfos = state.stockInfos.filter(x => x.id !== id);
    let newState = { ...state, stockInfos: newStockInfos };
    newState.totalPurchasePrice = getTotalPurchaseSum(newState.stockInfos)

    return newState;
  })
);

function getTotalPurchaseSum(stockInfos: StockInfoDto[]) {
  return stockInfos.reduce(
    (sum, current) => sum + (current.purchasePrice * current.quantity),
    0
  );
}