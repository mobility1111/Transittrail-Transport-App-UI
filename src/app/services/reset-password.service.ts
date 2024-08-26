
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../models/reset-password.model';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class  ResetPasswordService {

  private baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  sendResetPsswordLink(email: string){
     return this.http.post<any>(`${this.baseApiUrl}/api/User/send-reset-email/${email}`, {});
  }

  resetPassword(resetPasswordObj: ResetPassword){
    return this.http.post<any>(`${this.baseApiUrl}/api/User/reset-password`, resetPasswordObj);
  }
}


