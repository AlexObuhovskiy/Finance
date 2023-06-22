import { createAction, props } from '@ngrx/store';
import { StockInfoDto } from '../../models/stock-info-dto.model';
 
export const invokeStockInfosAPI = createAction(
  '[Stock info API] Invoke Stock infos Fetch API'
);
 
export const stockInfosFetchAPISuccess = createAction(
  '[Stock info API] Fetch API Success',
  props<{ allStockInfos: StockInfoDto[] }>()
);

export const invokeCreateStockInfoAPI = createAction(
  '[Stock info API] Inovke create stock info api',
  props<{ newStockInfo: StockInfoDto }>()
);
 
export const createStockInfoAPISuccess = createAction(
  '[Stock info API] create stock info api success',
  props<{ newStockInfo: StockInfoDto }>()
);

export const invokeUpdateStockInfoAPI = createAction(
  '[Stock info API] Inovke update stock info api',
  props<{ id: string, stockInfo: StockInfoDto }>()
);
 
export const updateStockInfoAPISuccess = createAction(
  '[Stock info API] update stock info api success',
  props<{ id: string, stockInfo: StockInfoDto }>()
);

export const invokeDeleteStockInfoAPI = createAction(
  '[Stock info API] Inovke delete stock info api',
  props<{ id: string }>()
);
 
export const deleteStockInfoAPISuccess = createAction(
  '[Stock info API] delete stock info api success',
  props<{ id: string }>()
);

