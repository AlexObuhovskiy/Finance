import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StockInfoComponent } from './stock-list/stock-info/stock-info.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { FormsModule } from '@angular/forms';
import { AddStockInfoPopupComponent } from './stock-list/add-stock-info-popup/add-stock-info-popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { stockInfoReducer } from './stock-list/store/stock-info.reducer';
import { StockInfoEffect } from './stock-list/store/stock-info.effect';
import { appReducer } from './shared/store/app.reducer';

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
    NgbModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    StoreModule.forRoot({ 
      stockInfos: stockInfoReducer,
      appState: appReducer
     }),
    EffectsModule.forRoot([StockInfoEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
