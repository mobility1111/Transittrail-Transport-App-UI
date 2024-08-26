import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Terminal } from '../models/Terminal.model';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  private baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getTerminals(search?: string): Observable<Terminal[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<Terminal[]>(`${this.baseApiUrl}/api/Terminals`, { params })
      .pipe(
        tap(data => console.log('Terminals Data:', data)),
        map(data => data)
      );
  }

  getTerminal(id: string): Observable<Terminal> {
    return this.http.get<Terminal>(`${this.baseApiUrl}/api/Terminals/${id}`);
  }

  addTerminal(terminal: Terminal): Observable<Terminal> {
    return this.http.post<Terminal>(`${this.baseApiUrl}/api/Terminals/addTerminal`, terminal);
  }

  updateTerminal(id: string, terminal: Terminal): Observable<void> {
    return this.http.put<void>(`${this.baseApiUrl}/api/Terminals/${id}`, terminal);
  }

  deleteTerminal(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/api/Terminals/${id}`);
  }
}


















// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Observable, map, tap } from 'rxjs';
// import { Terminal } from '../models/Terminal.model';


// @Injectable({
//   providedIn: 'root'
// })
// export class TerminalService {
//   private apiUrl = 'https://localhost:7284/api/Terminals';  
//   private baseUrl = 'https://localhost:7284/api/Terminals';

//   constructor(private http: HttpClient) { }

//   getTerminals(search?: string): Observable<Terminal[]> {
//     let params = new HttpParams();
//     if (search) {
//       params = params.set('search', search);
//     }

//     return this.http.get<Terminal[]>(this.baseUrl, { params })
//       .pipe(
//         tap(data => console.log('Terminals Data:', data)),
//         map(data => data)
//       );
//   }

//   getTerminal(id: string): Observable<Terminal> {
//     return this.http.get<Terminal>(`${this.apiUrl}/${id}`);
//   }

//   addTerminal(terminal: Terminal): Observable<Terminal> {
//     return this.http.post<Terminal>(`${this.apiUrl}/addTerminal`, terminal);
//   }

//   updateTerminal(id: string, terminal: Terminal): Observable<void> {
//     return this.http.put<void>(`${this.apiUrl}/${id}`, terminal);
//   }

//   deleteTerminal(id: string): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }
// }
