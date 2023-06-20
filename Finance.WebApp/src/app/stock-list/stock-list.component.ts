import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StockInfoResponseDto } from '../models/stock-info-dto.model';
import { StockInfoService } from '../services/stock-info.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.less']
})
export class StockListComponent implements OnInit {
  stockInfos$!: Observable<StockInfoResponseDto[]>;

  constructor(private stockInfoService: StockInfoService) { }

  ngOnInit() {
    this.stockInfos$ = this.stockInfoService.getStockInfos();
  }
}
