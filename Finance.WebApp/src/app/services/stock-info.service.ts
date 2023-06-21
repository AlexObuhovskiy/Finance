import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockInfoDto, StockInfoResponseDto } from '../stock-list/store/stock-info-dto.model';

@Injectable({
  providedIn: 'root'
})
export class StockInfoService {
  private readonly baseUrl = 'https://localhost:7236/api/stockinfos';

  constructor(private http: HttpClient) { }

  getStockInfos(): Observable<StockInfoResponseDto[]> {
    return this.http.get<StockInfoResponseDto[]>(this.baseUrl);
  }

  getStockInfo(id: string): Observable<StockInfoResponseDto> {
    return this.http.get<StockInfoResponseDto>(`${this.baseUrl}/${id}`);
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
