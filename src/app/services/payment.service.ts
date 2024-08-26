import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentTransaction } from '../models/PaymentTransaction';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  initiatePayment(paymentRequest: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/api/payment/initiate`, paymentRequest);
  }

  verifyTransaction(reference: string): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/api/payment/verify/${reference}`);
  }

  getPaymentTransactions(): Observable<PaymentTransaction[]> {
    const url = `${this.baseApiUrl}/api/payment/transactions`;
    return this.http.get<PaymentTransaction[]>(url);
  }

  getTransactions(): Observable<PaymentTransaction[]> {
    const url = `${this.baseApiUrl}/api/Payment/transactions`;
    return this.http.get<PaymentTransaction[]>(url);
  }
}
