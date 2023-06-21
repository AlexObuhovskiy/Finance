import { createAction, props } from '@ngrx/store';
import { StockInfoResponseDto } from './stock-info-dto.model';
 
export const invokeStockInfosAPI = createAction(
  '[Stock info API] Invoke Stock infos Fetch API'
);
 
export const stockInfosFetchAPISuccess = createAction(
  '[Stock info API] Fetch API Success',
  props<{ allStockInfos: StockInfoResponseDto[] }>()
);

export const invokeCreateStockInfoAPI = createAction(
  '[Stock info API] Inovke create stock info api',
  props<{ newStockInfo: StockInfoResponseDto }>()
);
 
export const createStockInfoAPISuccess = createAction(
  '[Stock info API] create stock info api success',
  props<{ newStockInfo: StockInfoResponseDto }>()
);

export const invokeUpdateStockInfoAPI = createAction(
  '[Stock info API] Inovke update stock info api',
  props<{ id: string, stockInfo: StockInfoResponseDto }>()
);
 
export const updateStockInfoAPISuccess = createAction(
  '[Stock info API] update stock info api success',
  props<{ id: string, stockInfo: StockInfoResponseDto }>()
);

export const invokeDeleteStockInfoAPI = createAction(
  '[Stock info API] Inovke delete stock info api',
  props<{ id: string }>()
);
 
export const deleteStockInfoAPISuccess = createAction(
  '[Stock info API] delete stock info api success',
  props<{ id: string }>()
);

