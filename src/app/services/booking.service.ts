// src/app/services/booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Booking } from '../models/Booking';
import { PlaceBookingRequest } from '../models/PlaceOrderRequest';
import { BookingStatusResponse } from '../models/OrderStatusResponse';


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  placeBooking(placeBookingRequest: PlaceBookingRequest): Observable<string> {
    return this.http.post<string>(`${this.baseApiUrl}/api/Booking/place`, placeBookingRequest);
  }

  getBooking(bookingId: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseApiUrl}/api/Booking/${bookingId}`);
  }

  getBookingDetails(bookingId: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseApiUrl}/api/Booking/${bookingId}`);
  }

  getBookingHistory(userId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseApiUrl}/api/Booking/history/${userId}`);
  }

  trackBooking(bookingId: string): Observable<BookingStatusResponse> {
    return this.http.get<BookingStatusResponse>(`${this.baseApiUrl}/api/Booking/track/${bookingId}`);
  }

  getBookingStatus(bookingId: string): Observable<BookingStatusResponse> {
    return this.http.get<BookingStatusResponse>(`${this.baseApiUrl}/api/Booking/status/${bookingId}`);
  }

  updateBooking(bookingId: string, booking: Booking): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/api/Booking/${bookingId}`, booking);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseApiUrl}/api/Booking`);
  }

  getUserBookings(userId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseApiUrl}/api/Booking/user/${userId}`);
  }
  // getUserBookings(userId: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  // }
}