import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StockInfoDto, StockInfoResponseDto } from '../models/stock-info-dto.model';
import { StockInfoService } from '../services/stock-info.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.less']
})
export class StockListComponent implements OnInit {
  stockInfos$!: Observable<StockInfoResponseDto[]>;
  isAddPopupOpen = false;

  constructor(private stockInfoService: StockInfoService) { }

  ngOnInit() {
    this.stockInfos$ = this.stockInfoService.getStockInfos();
  }

  openAddStockInfoPopup() {
    this.isAddPopupOpen = true;
  }

  closeAddStockInfoPopup() {
    this.isAddPopupOpen = false;
  }

  addStockInfo(stockInfo: StockInfoDto) {
    // Implement the logic to add new stock info using the stockInfoService
    // and update the stockInfos$ observable accordingly
  }
}
