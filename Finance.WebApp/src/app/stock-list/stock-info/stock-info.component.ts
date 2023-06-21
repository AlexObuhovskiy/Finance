import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StockInfoDto } from '../store/stock-info-dto.model';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.less']
})
export class StockInfoComponent {
  @Input() stockInfo!: StockInfoDto;
  @Output() editClick = new EventEmitter<StockInfoDto>();
  @Output() deleteClick = new EventEmitter<StockInfoDto>();

  editStockInfo() {
    this.editClick.emit(this.stockInfo);
  }

  deleteStockInfo() {
    this.deleteClick.emit(this.stockInfo);
  }
} 