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
  deleteStockInfoAPISuccess
} from './stock-info.action';
import { selectStockInfos } from './stock-info.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Injectable()
export class StockInfoEffect {
  constructor(
    private actions$: Actions,
    private stockInfoService: StockInfoService,
    private store: Store,
    private appStore: Store<Appstate>
  ) { }

  loadAllStockInfos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeStockInfosAPI),
      withLatestFrom(this.store.pipe(select(selectStockInfos))),
      mergeMap(([, stockInfoformStore]) => {
        if (stockInfoformStore.length > 0) {
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
}
