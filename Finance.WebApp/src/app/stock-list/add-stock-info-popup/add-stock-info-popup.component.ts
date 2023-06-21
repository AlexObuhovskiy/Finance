import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StockInfoDto } from '../store/stock-info-dto.model';

@Component({
  selector: 'app-add-stock-info-popup',
  templateUrl: './add-stock-info-popup.component.html',
  styleUrls: ['./add-stock-info-popup.component.less']
})
export class AddStockInfoPopupComponent {
  @Output() submitStockInfo = new EventEmitter<StockInfoDto>();
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Input() isOpen = false;
  @Input() model: StockInfoDto = {} as StockInfoDto;

  close() {
    this.isOpen = false;
    this.model = {} as StockInfoDto;
    this.isOpenChange.emit(this.isOpen);
  }

  submitForm(stockInfo: StockInfoDto) {
    const purchaseDate = new Date(stockInfo.purchaseDate);
    const stockInfoData = {
      ...stockInfo, purchaseDate: new Date(purchaseDate.getTime() - purchaseDate.getTimezoneOffset() * 60000)
    };
    this.submitStockInfo.emit(stockInfoData);
    this.close();
  }
}
