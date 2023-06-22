import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StocksPriceResponseDto } from '../models/stock-prices-response.model';

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService {
  private readonly baseUrl = 'https://localhost:7236/api/googlesheets';

  constructor(private http: HttpClient) { }

  refreshCurrentStockPrices(): Observable<StocksPriceResponseDto> {
    return this.http.get<StocksPriceResponseDto>(this.baseUrl);
  }
}
