import { createReducer, on } from "@ngrx/store";
import { StockInfoDto } from "./stock-info-dto.model";
import {
  createStockInfoAPISuccess,
  deleteStockInfoAPISuccess,
  stockInfosFetchAPISuccess,
  updateStockInfoAPISuccess
} from "./stock-info.action";
import { StockInfoStoreModel } from "./stock-info-store.model";

export const initialState: Readonly<StockInfoStoreModel> = {
  stockInfos: []
};

export const stockInfoReducer = createReducer(
  initialState,
  on(stockInfosFetchAPISuccess, (state, { allStockInfos }) => {
    let newState = {
      ...state,
      stockInfos: allStockInfos
    }

    return newState;
  }),
  on(createStockInfoAPISuccess, (state, { newStockInfo }) => {
    let newState = { ...state, stockInfos: [...state.stockInfos] };
    newState.stockInfos.push(newStockInfo);

    return newState;
  }),
  on(updateStockInfoAPISuccess, (state, { id, stockInfo }) => {
    let newState = { ...state, stockInfos: [...state.stockInfos] };
    const stockInfoIndex = newState.stockInfos.findIndex(x => x.id === id);
    newState.stockInfos[stockInfoIndex] = { ...stockInfo, id };

    return newState;
  }),
  on(deleteStockInfoAPISuccess, (state, { id }) => {
    let newState = { ...state, stockInfos: [...state.stockInfos] };
    const stockInfoIndex = newState.stockInfos.findIndex(x => x.id === id);
    newState.stockInfos.splice(stockInfoIndex, 1);

    return newState;
  })
);