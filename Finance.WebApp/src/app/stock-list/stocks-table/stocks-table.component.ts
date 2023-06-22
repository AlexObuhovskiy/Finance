import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectGroupedStockInfos } from '../store/stock-info.selector';
import { GroupedStockInfo } from 'src/app/models/grouped-stock-info.model';
import { invokeRefreshCurrentStockPricesAPI } from '../store/stock-info.action';

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: ['./stocks-table.component.less']
})
export class StocksTableComponent implements OnInit {
  constructor(private store: Store) { }

  groupedStockInfos$: Observable<GroupedStockInfo[]> = this.store.pipe(select(selectGroupedStockInfos));

  ngOnInit() {
    this.store.dispatch(invokeRefreshCurrentStockPricesAPI());
  }
}
