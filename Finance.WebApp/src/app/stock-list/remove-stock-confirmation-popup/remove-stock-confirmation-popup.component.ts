import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StockInfoDto } from '../../models/stock-info-dto.model';

@Component({
  selector: 'app-remove-stock-confirmation-popup',
  templateUrl: './remove-stock-confirmation-popup.component.html',
  styleUrls: ['./remove-stock-confirmation-popup.component.less']
})
export class RemoveStockConfirmationPopupComponent {
  @Input() isOpen = false;
  @Input() model: StockInfoDto = {} as StockInfoDto;
  @Output() closePopup = new EventEmitter<void>();
  @Output() delete = new EventEmitter<StockInfoDto>();

  close() {
    this.isOpen = false;
    this.closePopup.emit();
  }

  deleteStockInfo() {
    this.delete.emit(this.model);
    this.close();
  }
}
