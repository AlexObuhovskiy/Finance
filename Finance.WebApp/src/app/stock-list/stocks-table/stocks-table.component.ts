import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectGroupedStockInfos } from '../store/stock-info.selector';
import { GroupedStockInfo } from 'src/app/models/grouped-stock-info.model';

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: ['./stocks-table.component.less']
})
export class StocksTableComponent {
  constructor(private store: Store) { }

  groupedStockInfos$: Observable<GroupedStockInfo[]> = this.store.pipe(select(selectGroupedStockInfos));
}
