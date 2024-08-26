import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rooute } from '../models/Rooute.model';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RoouteService {
  private baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getRooutes(search?: string): Observable<Rooute[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<Rooute[]>(`${this.baseApiUrl}/api/Rooute`, { params });
  }

  getRooute(id: string): Observable<Rooute> {
    return this.http.get<Rooute>(`${this.baseApiUrl}/api/Rooute/${id}`);
  }

  addRooute(rooute: Rooute): Observable<Rooute> {
    return this.http.post<Rooute>(`${this.baseApiUrl}/api/Rooute`, rooute);
  }

  updateRooute(id: string, rooute: Rooute): Observable<void> {
    return this.http.put<void>(`${this.baseApiUrl}/api/Rooute/${id}`, rooute);
  }

  deleteRooute(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/api/Rooute/${id}`);
  }

  getTerminals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/api/Rooute/terminals`);
  }

  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/api/Rooute/vehicles`);
  }

  getTransportLines(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/api/Rooute/transportlines`);
  }

  getRoouteDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/api/Rooute/${id}`);
  }

  compareRates(originTerminalId: string, destinationTerminalId: string): Observable<{ transportLineName: string, rate: number, vehicleType: string }[]> {
    return this.http.get<{ transportLineName: string, rate: number, vehicleType: string }[]>(`${this.baseApiUrl}/api/Rooute/compare`, {
      params: {
        originTerminalId: originTerminalId,
        destinationTerminalId: destinationTerminalId
      }
    });
  }

  getFeaturedRooutes(): Observable<Rooute[]> {
    return this.http.get<Rooute[]>(`${this.baseApiUrl}/api/Rooute/featuredRooutes`);
  }
}
















// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Rooute } from '../models/Rooute.model';


// @Injectable({
//   providedIn: 'root'
// })
// export class RoouteService {

//   private baseUrl = 'https://localhost:7284/api/Rooute';
//   private apiUrl = 'https://localhost:7284/api/Rooute';

//   constructor(private http: HttpClient) { }

//   getRooutes(search?: string): Observable<Rooute[]> {
//     let params = new HttpParams();
//     if (search) {
//       params = params.set('search', search);
//     }
//     return this.http.get<Rooute[]>(this.apiUrl, { params });
//   }


//   getRooute(id: string): Observable<Rooute> {
//     return this.http.get<Rooute>(`${this.baseUrl}/${id}`);
//   }

//   addRooute(rooute: Rooute): Observable<Rooute> {
//     return this.http.post<Rooute>(this.baseUrl, rooute);
//   }

//   updateRooute(id: string, rooute: Rooute): Observable<void> {
//     return this.http.put<void>(`${this.baseUrl}/${id}`, rooute);
//   }

//   deleteRooute(id: string): Observable<void> {
//     return this.http.delete<void>(`${this.baseUrl}/${id}`);
//   }

//   getTerminals(): Observable<any[]> {
//     return this.http.get<any[]>('https://localhost:7284/api/Rooute/terminals');
//   }

//   getVehicles(): Observable<any[]> {
//     return this.http.get<any[]>('https://localhost:7284/api/Rooute/vehicles');
//   }

//   getTransportLines(): Observable<any[]> {
//     return this.http.get<any[]>('https://localhost:7284/api/Rooute/transportlines');
//   }

//   getRoouteDetails(id: string): Observable<any> {
//     return this.http.get<any>(`${this.baseUrl}/${id}`);
//   }

//   compareRates(originTerminalId: string, destinationTerminalId: string): Observable<{ transportLineName: string, rate: number, vehicleType: string }[]> {
//     return this.http.get<{ transportLineName: string, rate: number, vehicleType: string }[]>(`${this.baseUrl}/compare`, {
//       params: {
//         originTerminalId: originTerminalId,
//         destinationTerminalId: destinationTerminalId
//       }
//     });
//   }

//   getFeaturedRooutes(): Observable<Rooute[]> {
//     return this.http.get<Rooute[]>(`${this.apiUrl}/featuredRooutes`);
//   }

// }

