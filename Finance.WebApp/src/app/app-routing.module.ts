import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockListComponent } from './stock-list/stock-list.component';
import { StocksTableComponent } from './stock-list/stocks-table/stocks-table.component';
import { SummaryTableComponent } from './stock-list/summary-table/summary-table.component';

const routes: Routes = [
  { path: 'summary-table', component: SummaryTableComponent },
  { path: 'stock-list', component: StockListComponent },
  { path: 'stock-table', component: StocksTableComponent },
  { path: '**', component: StockListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
