import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { StockInfoService } from '../../services/stock-info.service';
import {
  stockInfosFetchAPISuccess,
  invokeStockInfosAPI,
  invokeCreateStockInfoAPI,
  createStockInfoAPISuccess,
  invokeUpdateStockInfoAPI,
  updateStockInfoAPISuccess,
  invokeDeleteStockInfoAPI,
  deleteStockInfoAPISuccess,
  invokeRefreshCurrentStockPricesAPI,
  refreshCurrentStockPricesAPISuccess
} from './stock-info.action';
import { selectStockInfoState } from './stock-info.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { GoogleSheetsService } from 'src/app/services/google-sheets.service';

@Injectable()
export class StockInfoEffect {
  constructor(
    private actions$: Actions,
    private stockInfoService: StockInfoService,
    private googleSheetsService: GoogleSheetsService,
    private store: Store,
    private appStore: Store<Appstate>
  ) { }

  loadAllStockInfos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeStockInfosAPI),
      withLatestFrom(this.store.pipe(select(selectStockInfoState))),
      mergeMap(([, stockInfoformStore]) => {
        if (stockInfoformStore.stockInfos.length > 0) {
          return EMPTY;
        }
        return this.stockInfoService
          .getStockInfos()
          .pipe(map((data) => stockInfosFetchAPISuccess({ allStockInfos: data })));
      })
    )
  );

  createStockInfoAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeCreateStockInfoAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.stockInfoService.createStockInfo(action.newStockInfo).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return createStockInfoAPISuccess({ newStockInfo: data });
          })
        );
      })
    );
  });

  updateStockInfoAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateStockInfoAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.stockInfoService.updateStockInfo(action.id, action.stockInfo).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateStockInfoAPISuccess({ id: action.id, stockInfo: action.stockInfo });
          })
        );
      })
    );
  });

  deleteStockInfoAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteStockInfoAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.stockInfoService.deleteStockInfo(action.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteStockInfoAPISuccess({ id: action.id });
          })
        );
      })
    );
  });

  refreshCurrentStockPricesAPI$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeRefreshCurrentStockPricesAPI),
      withLatestFrom(this.store.pipe(select(selectStockInfoState))),
      mergeMap(([, stockInfoformStore]) => {
        if (stockInfoformStore.currentStockPrices.length > 0) {
          return EMPTY;
        }
        return this.googleSheetsService
          .refreshCurrentStockPrices()
          .pipe(map((data) => refreshCurrentStockPricesAPISuccess({ currentStockPrices: data.stockPrices })));
      })
    )
  );
}
