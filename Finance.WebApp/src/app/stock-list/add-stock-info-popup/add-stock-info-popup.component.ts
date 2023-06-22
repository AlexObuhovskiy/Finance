import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StockInfoDto } from '../store/stock-info-dto.model';

@Component({
  selector: 'app-add-stock-info-popup',
  templateUrl: './add-stock-info-popup.component.html',
  styleUrls: ['./add-stock-info-popup.component.less']
})
export class AddStockInfoPopupComponent {
  @Input() isOpen = false;
  @Input() model: StockInfoDto = {} as StockInfoDto;
  @Output() submitStockInfo = new EventEmitter<StockInfoDto>();
  @Output() closePopup = new EventEmitter<void>();

  close() {
    this.isOpen = false;
    this.model = {} as StockInfoDto;
    this.closePopup.emit();
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
