import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { selectTotalPriceForNow, selectTotalPurchasePrice } from '../store/stock-info.selector';

@Component({
  selector: 'app-summary-table',
  templateUrl: './summary-table.component.html',
  styleUrls: ['./summary-table.component.less']
})
export class SummaryTableComponent implements OnInit {
  totalIncome: number = 0;
  totalIncreasement: number = 0;
  totalPurchasePrice$: Observable<number> = this.store.pipe(select(selectTotalPurchasePrice));
  totalPriceForNow$: Observable<number> = this.store.pipe(select(selectTotalPriceForNow));
  totalIncome$: Observable<number> = combineLatest([
    this.totalPriceForNow$,
    this.totalPurchasePrice$
  ]).pipe(
    map(([totalPriceForNow, totalPurchasePrice]) => totalPriceForNow - totalPurchasePrice)
  );
  totalIncreasement$: Observable<number> = combineLatest([
    this.totalPriceForNow$,
    this.totalPurchasePrice$
  ]).pipe(
    map(([totalPriceForNow, totalPurchasePrice]) => (totalPriceForNow / totalPurchasePrice - 1) * 100)
  );

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.totalIncome$.subscribe(x => this.totalIncome = x);
    this.totalIncreasement$.subscribe(x => this.totalIncreasement = x);
  }
}
