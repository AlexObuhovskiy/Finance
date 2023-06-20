import { Component, Input } from '@angular/core';
import { StockInfoResponseDto } from '../models/stock-info-dto.model';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.less']
})
export class StockInfoComponent {
  @Input() stockInfo!: StockInfoResponseDto;
}
