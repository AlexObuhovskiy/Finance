import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StockInfoDto } from '../models/stock-info-dto.model';

@Component({
  selector: 'app-add-stock-info-popup',
  templateUrl: './add-stock-info-popup.component.html',
  styleUrls: ['./add-stock-info-popup.component.less']
})
export class AddStockInfoPopupComponent {
  @Output() addStockInfo = new EventEmitter<StockInfoDto>();
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Input() isOpen = false;
  @Input() model: StockInfoDto = {} as StockInfoDto;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    this.model = {} as StockInfoDto;
    this.isOpenChange.emit(this.isOpen);
  }

  submitForm(stockInfo: StockInfoDto) {
    debugger;
    this.addStockInfo.emit(stockInfo);
    this.close();
  }
}
