import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransportLine } from '../models/TransportLine.model';
import { TransportLineWithTerminal } from '../DTOs/TransportLineWithTerminal';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransportLineService {
  private apiUrl: string = `${environment.baseApiUrl}/api/TransportLine`;

  constructor(private http: HttpClient) {}

  getTransportLines(): Observable<TransportLineWithTerminal[]> {
    return this.http.get<TransportLineWithTerminal[]>(this.apiUrl);
  }

  getTransportLine(id: string): Observable<TransportLine> {
    return this.http.get<TransportLine>(`${this.apiUrl}/${id}`);
  }

  addTransportLine(transportLine: TransportLine): Observable<TransportLine> {
    return this.http.post<TransportLine>(this.apiUrl, transportLine);
  }

  getTransportLinesByTerminal(terminalId: string): Observable<TransportLine[]> {
    return this.http.get<TransportLine[]>(`${this.apiUrl}/terminal/${terminalId}`);
  }

  updateTransportLine(id: string, transportLine: TransportLine): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, transportLine);
  }

  deleteTransportLine(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getFeaturedTransportLines(): Observable<TransportLine[]> {
    return this.http.get<TransportLine[]>(`${this.apiUrl}/featuredTransportLines`);
  }
}

















// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { TransportLine } from '../models/TransportLine.model';
// import { TransportLineWithTerminal } from '../DTOs/TransportLineWithTerminal';


// @Injectable({
//   providedIn: 'root'
// })
// export class TransportLineService {
//   private apiUrl = 'https://localhost:7284/api/TransportLine'; 
//   private baseUrl = 'https://localhost:7284/api';

//   constructor(private http: HttpClient) {}

//   getTransportLines(): Observable<TransportLineWithTerminal[]> {
//     return this.http.get<TransportLineWithTerminal[]>(this.apiUrl);
// }

//   getTransportLine(id: string): Observable<TransportLine> {
//     return this.http.get<TransportLine>(`${this.apiUrl}/${id}`);
//   }

//   addTransportLine(transportLine: TransportLine): Observable<TransportLine> {
//     return this.http.post<TransportLine>(this.apiUrl, transportLine);
//   }

//   getTransportLinesByTerminal(terminalId: string): Observable<TransportLine[]> {
//     return this.http.get<TransportLine[]>(`${this.baseUrl}/TransportLine/terminal/${terminalId}`);
//   }

//   updateTransportLine(id: string, transportLine: TransportLine): Observable<void> {
//     return this.http.put<void>(`${this.apiUrl}/${id}`, transportLine);
//   }

//   deleteTransportLine(id: string): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }

//   getFeaturedTransportLines(): Observable<TransportLine[]> {
//     return this.http.get<TransportLine[]>(`${this.apiUrl}/featuredTransportLines`);
//   }
// }
