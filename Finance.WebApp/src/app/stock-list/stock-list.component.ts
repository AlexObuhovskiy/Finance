import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StockInfoDto, StockInfoResponseDto } from '../models/stock-info-dto.model';
import { StockInfoService } from '../services/stock-info.service';
import { ChangeStatuses } from '../enums/change-statuses';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.less']
})
export class StockListComponent implements OnInit, OnDestroy {
  private modelStatus!: ChangeStatuses;
  ddd: any;

  stockInfos$!: Observable<StockInfoResponseDto[]>;
  createSubscription: Subscription = new Subscription();
  isAddPopupOpen = false;
  currentModel = {} as StockInfoResponseDto;

  constructor(private stockInfoService: StockInfoService) { }

  async ngOnInit() {
    this.refreshStockInfos();
  }

  ngOnDestroy(): void {
    this.createSubscription.unsubscribe();
  }

  openAddStockInfoPopup() {
    this.modelStatus = ChangeStatuses.Create;
    this.currentModel = {} as StockInfoResponseDto;
    this.isAddPopupOpen = true;
  }

  editStockInfo(stockInfo: StockInfoResponseDto) {
    this.modelStatus = ChangeStatuses.Update;
    this.currentModel = { ...stockInfo };
    this.isAddPopupOpen = true;
  }

  deleteStockInfo(stockInfo: StockInfoResponseDto) {
    this.createSubscription.add(
      this.stockInfoService.deleteStockInfo(stockInfo.id)
        .subscribe({
          next: response => {
            console.log('Stock info deleted successfully', response);
            this.refreshStockInfos();
          },
          error: error => {
            console.error('Failed to delete stock info', error);
          }
        })
    );
  }

  closeAddStockInfoPopup() {
    this.isAddPopupOpen = false;
  }

  submitStockInfo(stockInfo: StockInfoDto) {
    switch (this.modelStatus) {
      case ChangeStatuses.Create:
        this.createSubscription.add(
          this.stockInfoService.createStockInfo(stockInfo)
            .subscribe({
              next: response => {
                console.log('Stock info created successfully', response);
                this.refreshStockInfos();
              },
              error: error => {
                console.error('Failed to create stock info', error);
              }
            })
        );
        break;

      case ChangeStatuses.Update:
        this.createSubscription.add(
          this.stockInfoService.updateStockInfo(this.currentModel.id, stockInfo)
            .subscribe({
              next: response => {
                console.log('Stock info update successfully', response);
                this.refreshStockInfos();
              },
              error: error => {
                console.error('Failed to update stock info', error);
              }
            })
        );
        break;
    }
  }

  private refreshStockInfos() {
    this.stockInfos$ = this.stockInfoService.getStockInfos();
  }
}
