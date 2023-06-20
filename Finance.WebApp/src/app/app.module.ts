import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StockInfoComponent } from './stock-info/stock-info.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { FormsModule } from '@angular/forms';
import { AddStockInfoPopupComponent } from './add-stock-info-popup/add-stock-info-popup.component';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    StockInfoComponent,
    StockInfoComponent,
    StockListComponent,
    AddStockInfoPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [[{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]],
  bootstrap: [AppComponent]
})
export class AppModule { }
