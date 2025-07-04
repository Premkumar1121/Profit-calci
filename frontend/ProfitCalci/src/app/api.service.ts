import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProfitInput {
  distance: number;
  weight: number;
  priority: string;
}

export interface ProfitResult {
  fuelCost: number;
  laborCost: number;
  tollCost: number;
  totalCost: number;
  recommendedPrice: number;
  netProfit: number;
}

@Injectable({ providedIn: 'root' })
export class ProfitService {
  private apiUrl = '/api/calculate-profit'; // Use proxy if needed

  constructor(private http: HttpClient) {}

  calculateProfit(data: ProfitInput): Observable<ProfitResult> {
    return this.http.post<ProfitResult>(this.apiUrl, data);
  }
}
