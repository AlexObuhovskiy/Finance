import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StockInfoDto } from './store/stock-info-dto.model';
import { ChangeStatuses } from '../enums/change-statuses';
import { Store, select } from '@ngrx/store';
import { selectStockInfos, selectTotalPurchasePrice } from './store/stock-info.selector';
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
  totalPurchasePrice$: Observable<number> = this.store.pipe(select(selectTotalPurchasePrice));
  isAddPopupOpen = false;
  isConfirmDeletePopupOpen = false;
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

  closeAddStockInfoPopup() {
    this.isAddPopupOpen = false;
  }

  closeConfirmDeletePopup() {
    this.isConfirmDeletePopupOpen = false;
  }

  editStockInfo(stockInfo: StockInfoDto) {
    this.modelStatus = ChangeStatuses.Update;
    this.currentModel = { ...stockInfo };
    this.isAddPopupOpen = true;
  }

  askConfirmDeleteStockInfo(stockInfo: StockInfoDto) {
    this.currentModel = stockInfo;
    this.isConfirmDeletePopupOpen = true;
  }

  deleteStockInfo() {
    const id = this.currentModel.id;
    this.store.dispatch(invokeDeleteStockInfoAPI({ id }));
  }

  submitStockInfo(stockInfo: StockInfoDto) {
    switch (this.modelStatus) {
      case ChangeStatuses.Create:
        this.store.dispatch(
          invokeCreateStockInfoAPI({ newStockInfo: stockInfo })
        );
        break;

      case ChangeStatuses.Update:
        const id = this.currentModel.id;
        this.store.dispatch(
          invokeUpdateStockInfoAPI({ id, stockInfo: stockInfo })
        );
        break;
    }
  }
}
