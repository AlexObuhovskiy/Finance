import { createFeatureSelector } from '@ngrx/store';
import { StockInfoResponseDto } from './stock-info-dto.model';
 
export const selectStockInfos = createFeatureSelector<StockInfoResponseDto[]>('stockInfos');