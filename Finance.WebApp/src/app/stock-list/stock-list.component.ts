import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StockInfoDto } from './store/stock-info-dto.model';
import { ChangeStatuses } from '../enums/change-statuses';
import { Store, select } from '@ngrx/store';
import { selectStockInfos } from './store/stock-info.selector';
import {
  invokeCreateStockInfoAPI,
  invokeDeleteStockInfoAPI,
  invokeStockInfosAPI,
  invokeUpdateStockInfoAPI
} from './store/stock-info.action';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.less']
})
export class StockListComponent implements OnInit {
  private modelStatus!: ChangeStatuses;
  stockInfos$: Observable<StockInfoDto[]> = this.store.pipe(select(selectStockInfos));
  isAddPopupOpen = false;
  currentModel = {} as StockInfoDto;

  constructor(
    private store: Store
  ) { }

  async ngOnInit() {
    this.store.dispatch(invokeStockInfosAPI());
  }

  openAddStockInfoPopup() {
    this.modelStatus = ChangeStatuses.Create;
    this.currentModel = {} as StockInfoDto;
    this.isAddPopupOpen = true;
  }

  editStockInfo(stockInfo: StockInfoDto) {
    this.modelStatus = ChangeStatuses.Update;
    this.currentModel = { ...stockInfo };
    this.isAddPopupOpen = true;
  }

  deleteStockInfo(stockInfo: StockInfoDto) {
    const id = stockInfo.id;
    this.store.dispatch(invokeDeleteStockInfoAPI({ id }));
  }

  closeAddStockInfoPopup() {
    this.isAddPopupOpen = false;
  }

  submitStockInfo(stockInfo: StockInfoDto) {
    switch (this.modelStatus) {
      case ChangeStatuses.Create:
        this.store.dispatch(
          invokeCreateStockInfoAPI({ newStockInfo: stockInfo as StockInfoDto })
        );
        break;

      case ChangeStatuses.Update:
        const id = this.currentModel.id;
        this.store.dispatch(
          invokeUpdateStockInfoAPI({ id, stockInfo: stockInfo as StockInfoDto })
        );
        break;
    }
  }
}
