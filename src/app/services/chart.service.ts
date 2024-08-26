import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { TransportLine } from '../models/TransportLine.model';


@Injectable({
  providedIn: 'root'
})
export class ChartService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getChart(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/api/Rates/analyzePrices?period=${payload.period}&transportLineName=${payload.transportLineName}&startDate=${payload.startDate}&endDate=${payload.endDate}`, payload);
  }

  getAllTransportLines(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/api/TransportLines`);
  }
}

