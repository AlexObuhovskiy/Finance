import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StockInfoResponseDto } from '../../models/stock-info-dto.model';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.less']
})
export class StockInfoComponent {
  @Input() stockInfo!: StockInfoResponseDto;
  @Output() editClick = new EventEmitter<StockInfoResponseDto>();
  @Output() deleteClick = new EventEmitter<StockInfoResponseDto>();

  editStockInfo() {
    this.editClick.emit(this.stockInfo);
  }

  deleteStockInfo() {
    this.deleteClick.emit(this.stockInfo);
  }
} 