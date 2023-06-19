import { Component, OnInit } from '@angular/core';
import { StockInfoService } from './services/stock-info.service';
import { StockInfoDto } from './models/stock-info-dto.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <h1>Stock Infos</h1>
    <ul>
      <li *ngFor="let stockInfo of stockInfos$ | async">
        {{ stockInfo.tickerName }} {{ stockInfo.quantity }} {{ stockInfo.purchasePrice }} {{ stockInfo.purchaseDate }}
      </li>
    </ul>
  `,
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  stockInfos$!: Observable<StockInfoDto[]>;

  constructor(private stockInfoService: StockInfoService) { }

  ngOnInit() {
    this.stockInfos$ = this.stockInfoService.getStockInfos();
  }
}
