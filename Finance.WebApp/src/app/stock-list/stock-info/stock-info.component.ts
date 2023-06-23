import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StockInfoDto } from '../../models/stock-info-dto.model';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.less']
})
export class StockInfoComponent {
  @Input({ required: true }) stockInfo!: StockInfoDto;
  @Output() editClick = new EventEmitter<StockInfoDto>();
  @Output() deleteClick = new EventEmitter<StockInfoDto>();

  get totalIncrease() {
    const currentPrice = this.stockInfo.currentPrice || 0;
    const result = ((currentPrice / this.stockInfo.purchasePrice) - 1) * 100;

    return result;
  }

  editStockInfo() {
    this.editClick.emit(this.stockInfo);
  }

  deleteStockInfo() {
    this.deleteClick.emit(this.stockInfo);
  }

  getCardColorClass(totalIncrease: number): string {
    if (totalIncrease >= 0) {
      // Calculate the gradient color based on totalIncrease value
      const greenShade = Math.floor((totalIncrease / 10) * 80); // Adjust the gradient range as needed
      return `card-green card-green-${greenShade}`;
    } else {
      // Calculate the gradient color based on totalIncrease value
      const redShade = Math.floor((-totalIncrease / 100) * 80); // Adjust the gradient range as needed
      return `card-red card-red-${redShade}`;
    }
  }
} 
