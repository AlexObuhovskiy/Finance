import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { invokeRefreshCurrentStockPricesAPI, invokeStockInfosAPI } from './stock-list/store/stock-info.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(invokeStockInfosAPI());
    this.store.dispatch(invokeRefreshCurrentStockPricesAPI());
  }
}
