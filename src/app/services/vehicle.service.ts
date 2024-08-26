import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { VehicleWithTransportLine } from '../DTOs/VehicleWithTransportLine';
import { Vehicle } from '../models/Vehicle.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl: string = `${environment.baseApiUrl}/api/Vehicle`;

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<VehicleWithTransportLine[]> {
    return this.http.get<VehicleWithTransportLine[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getVehicle(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle)
      .pipe(catchError(this.handleError));
  }

  getVehiclesByTransportLine(transportLineId: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/transportline/${transportLineId}`)
      .pipe(catchError(this.handleError));
  }

  updateVehicle(id: string, vehicle: Vehicle): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, vehicle)
      .pipe(catchError(this.handleError));
  }

  deleteVehicle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}


















// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { VehicleWithTransportLine } from '../DTOs/VehicleWithTransportLine';
// import { Vehicle } from '../models/Vehicle.model';




// @Injectable({
//   providedIn: 'root'
// })
// export class VehicleService {
//   private apiUrl = 'https://localhost:7284/api/Vehicle';
//   private baseUrl = 'https://localhost:7284/api';

//   constructor(private http: HttpClient) { }

//   getVehicles(): Observable<VehicleWithTransportLine[]> {
//     return this.http.get<VehicleWithTransportLine[]>(this.apiUrl);
// }
//   getVehicle(id: string): Observable<Vehicle> {
//     return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
//   }

//   addVehicle(vehicle: Vehicle): Observable<Vehicle> {
//     return this.http.post<Vehicle>(this.apiUrl, vehicle);
//   }

//   getVehiclesByTransportLine(transportLineId: string): Observable<Vehicle[]> {
//     return this.http.get<Vehicle[]>(`${this.baseUrl}/Vehicle/transportline/${transportLineId}`);
//   }

//   updateVehicle(id: string, vehicle: Vehicle): Observable<void> {
//     return this.http.put<void>(`${this.apiUrl}/${id}`, vehicle);
//   }

//   deleteVehicle(id: string): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }
// }
