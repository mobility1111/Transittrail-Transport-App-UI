import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


export interface RateComparisonDto {
    originTerminalName: string;
    destinationTerminalName: string;
    transportLineName: string;
    rate: number;
    vehicleType: string;
}

@Injectable({
    providedIn: 'root'
})
export class RateComparisonService {
    private apiUrl = `${environment.baseApiUrl}/api/Rooute/compare`;

    constructor(private http: HttpClient) { }

    compareRates(originTerminalId: string, destinationTerminalId: string): Observable<RateComparisonDto[]> {
        return this.http.get<RateComparisonDto[]>(`${this.apiUrl}`, {
            params: {
                originTerminalId,
                destinationTerminalId
            }
        });
    }
}








// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface RateComparisonDto {
//     originTerminalName: string;
//     destinationTerminalName: string;
//     transportLineName: string;
//     rate: number;
//     vehicleType: string;
// }

// @Injectable({
//     providedIn: 'root'
// })
// export class RateComparisonService {
//   private apiUrl = 'https://localhost:7284/api/Rooute/compare';

//     constructor(private http: HttpClient) { }

//     compareRates(originTerminalId: string, destinationTerminalId: string): Observable<RateComparisonDto[]> {
//         return this.http.get<RateComparisonDto[]>(`${this.apiUrl}?originTerminalId=${originTerminalId}&destinationTerminalId=${destinationTerminalId}`);
//     }
// }













// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { RateComparisonDto } from '../models/RateComparisonDto';

// @Injectable({
//   providedIn: 'root'
// })
// export class RateComparisonService {

//   private apiUrl = 'https://localhost:7284/api/Rooute/compare';
//   constructor() { }

//   compareRates(originTerminalId: string, destinationTerminalId: string): Observable<RateComparisonDto[]> {
//     return this.http.get<RateComparisonDto[]>(`${this.apiUrl}?originTerminalId=${originTerminalId}&destinationTerminalId=${destinationTerminalId}`);
// }
// }
