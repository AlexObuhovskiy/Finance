import { createReducer, on } from "@ngrx/store";
import { StockInfoResponseDto } from "./stock-info-dto.model";
import {
  createStockInfoAPISuccess,
  deleteStockInfoAPISuccess,
  stockInfosFetchAPISuccess,
  updateStockInfoAPISuccess
} from "./stock-info.action";

export const initialState: ReadonlyArray<StockInfoResponseDto> = [];

export const stockInfoReducer = createReducer(
  initialState,
  on(stockInfosFetchAPISuccess, (_state, { allStockInfos }) => {
    return allStockInfos;
  }),
  on(createStockInfoAPISuccess, (state, { newStockInfo }) => {
    let newState = [...state];
    newState.push(newStockInfo);
    return newState;
  }),
  on(updateStockInfoAPISuccess, (state, { id, stockInfo }) => {
    let newState = [...state];
    const stockInfoIndex = newState.findIndex(x => x.id === id);
    newState[stockInfoIndex] = { ...stockInfo, id };

    return newState;
  }),
  on(deleteStockInfoAPISuccess, (state, { id }) => {
    let newState = [...state];
    const stockInfoIndex = newState.findIndex(x => x.id === id);
    newState.splice(stockInfoIndex, 1);

    return newState;
  })
);