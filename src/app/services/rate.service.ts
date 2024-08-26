import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Rate } from '../models/Rate.model';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RateService {
  private baseApiUrl: string = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/api/rates`;

  constructor(private http: HttpClient) {}

  getRates(search?: string): Observable<Rate[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<Rate[]>(`${this.apiUrl}`, { params })
      .pipe(
        tap(data => console.log('Rates Data:', data)),
        map(data => data)
      );
  }

  getRateById(id: string): Observable<Rate> {
    return this.http.get<Rate>(`${this.apiUrl}/${id}`);
  }

  addRate(rate: Rate): Observable<Rate> {
    return this.http.post<Rate>(`${this.apiUrl}/addRate`, rate);
  }

  updateRate(id: string, rate: Rate): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, rate);
  }
}

















// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable, map, tap } from 'rxjs';
// import { Rate } from '../models/Rate.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class RateService {
//   private apiUrl = 'https://localhost:7284/api/rates';
//   private baseUrl = 'https://localhost:7284/api/Rates';

//   constructor(private http: HttpClient) {}

//   getRates(search?: string): Observable<Rate[]> {
//     let params = new HttpParams();
//     if (search) {
//       params = params.set('search', search);
//     }

//     return this.http.get<Rate[]>(this.baseUrl, { params })
//       .pipe(
//         tap(data => console.log('Rates Data:', data)),
//         map(data => data)
//       );
//   }

//   getRateById(id: string): Observable<Rate> {
//     return this.http.get<Rate>(`${this.apiUrl}/${id}`);
//   }

//   addRate(rate: Rate): Observable<Rate> {
//     return this.http.post<Rate>(`${this.apiUrl}/addRate`, rate);
//   }

//   updateRate(id: string, rate: Rate): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, rate);
//   }
// }