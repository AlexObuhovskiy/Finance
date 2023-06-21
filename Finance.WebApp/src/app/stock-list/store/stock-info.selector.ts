import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StockInfoStoreModel } from './stock-info-store.model';
 
export const selectStockInfoState = createFeatureSelector<StockInfoStoreModel>('stockInfos');

export const selectStockInfos = createSelector(selectStockInfoState, (state: StockInfoStoreModel) => {
  return state.stockInfos;
})