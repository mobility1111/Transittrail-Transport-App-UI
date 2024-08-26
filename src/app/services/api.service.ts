
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = `${environment.baseApiUrl}/api/User`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}








// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {
//   private baseUrl: string = 'https://localhost:7284/api/User'
//   constructor(private http: HttpClient) {}

// getUsers(){
//   return this.http.get<any>(this.baseUrl);
// }

// }