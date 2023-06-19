import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockInfoDto } from '../models/stock-info-dto.model';

@Injectable({
  providedIn: 'root'
})
export class StockInfoService {
  private baseUrl = 'https://localhost:7236/api/StockInfos';

  constructor(private http: HttpClient) { }

  getStockInfos(): Observable<StockInfoDto[]> {
    return this.http.get<StockInfoDto[]>(this.baseUrl);
  }

  getStockInfo(id: string): Observable<StockInfoDto> {
    return this.http.get<StockInfoDto>(`${this.baseUrl}/${id}`);
  }

  createStockInfo(stockInfo: StockInfoDto): Observable<any> {
    return this.http.post(this.baseUrl, stockInfo);
  }

  updateStockInfo(id: string, updatedStockInfo: StockInfoDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedStockInfo);
  }

  deleteStockInfo(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
