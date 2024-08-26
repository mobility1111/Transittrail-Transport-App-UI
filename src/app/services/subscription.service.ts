
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SubscriptionType } from '../models/SubscriptionType.model';
import { Subscription } from '../models/Subscription.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private readonly apiUrl: string = `${environment.baseApiUrl}/api`;

  constructor(private http: HttpClient) {}

  getAllSubscriptionTypes(): Observable<SubscriptionType[]> {
    return this.http.get<SubscriptionType[]>(`${this.apiUrl}/subscriptiontypes`)
      .pipe(catchError(this.handleError));
  }
 
  addUserSubscription(userId: string, subscriptionTypeId: number, amount: number): Observable<Subscription> {
    const requestBody = { userId, subscriptionTypeId, amount };
    return this.http.post<Subscription>(`${this.apiUrl}/User/subscriptions`, requestBody)
      .pipe(catchError(this.handleError));
  }

  checkSubscriptionStatus(userId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/user/${userId}/subscriptions`)
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
// import { Observable, catchError } from 'rxjs';
// import { SubscriptionType } from '../models/SubscriptionType.model';
// import { Subscription } from '../models/Subscription.model';
// import { environment } from '../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class SubscriptionService {
//   private readonly baseApiUrl: string = environment.baseApiUrl;

//   constructor(private http: HttpClient) {}

//   getAllSubscriptionTypes(): Observable<SubscriptionType[]> {
//     const url = `${this.baseApiUrl}/api/subscriptiontypes`;
//     return this.http.get<SubscriptionType[]>(url);
//   }
 
//   addUserSubscription(userId: string, subscriptionTypeId: number, amount: number): Observable<Subscription> {
//     const url = `${this.baseApiUrl}/api/User/subscriptions`;
//     const requestBody = { userId, subscriptionTypeId, amount };
//     return this.http.post<Subscription>(url, requestBody).pipe(
//       catchError((error) => {
//         console.error('Error creating subscription', error);
//         throw error;
//       })
//     );
//   }

//   // Check user's subscription status
//   checkSubscriptionStatus(userId: string): Observable<boolean> {
//     const url = `${this.baseApiUrl}/api/user/${userId}/subscriptions`;
//     return this.http.get<boolean>(url);
//   }
// }
