import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserProfile } from '../models/userprofile';
import { TokenApiModel } from '../models/token-api.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseApiUrl: string = environment.baseApiUrl;
  private baseUrl: string = "https://localhost:7284/User/"
  private userPayload:any;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  private loggedIn =false

  // signUp(userObj: any): Observable<any> {
  //   return this.http.post<any>(`https://localhost:7284/register`, userObj);  // Direct URL
  // }
  signUp(userObj: any): Observable<any> {
    return this.http.post<any>(this.baseApiUrl +'/api/user/register', userObj);
  }

  // login(loginObj: any): Observable<any> {
  //   return this.http.post<any>(` https://localhost:7284/authenticate`, loginObj);
  // }
  login(loginObj: any): Observable<any> {
   
    return this.http.post<any>(this.baseApiUrl +'/api/user/authenticate', loginObj);
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    } else {
      // Handle the case where there's no token (optional)
      console.error('No token available.');
      return new HttpHeaders();
    }
  }


  logout(){
    localStorage.clear();
    this.router.navigate(['login'])
    //localStorage.removeItem('token')
 }

 storeToken(tokenValue: string) {
  localStorage.setItem('token', tokenValue);
  console.log('Token stored:', tokenValue);
}

getToken() {
  const token = localStorage.getItem('token')
  console.log('Token retrieved:', token);
  return token;
}

renewToken(tokenApi: TokenApiModel): Observable<any> {
  return this.http.post<any>(this.baseApiUrl + '/api/user/refresh', tokenApi);
}

// renewToken(tokenApi : TokenApiModel){
//   return this.http.post<any>(`https://localhost:7284/api/user/refresh`, tokenApi)
// }

storeRefreshToken(tokenValue: string){
  localStorage.setItem('refreshToken', tokenValue)
  console.log('Tefreshed Stored', tokenValue)
}

getRefreshToken() {
  const token = localStorage.getItem('refreshToken')
  console.log('getRefreshToken',localStorage)
}

decodedToken(){
  const jwtHelper = new JwtHelperService();
  const token = this.getToken()!;
  console.log(jwtHelper.decodeToken(token))
  return jwtHelper.decodeToken(token)

}


getfullNameFromToken(){
  if(this.userPayload)
  return this.userPayload.name;
 }

 getRoleFromToken(){
   if(this.userPayload)
   return this.userPayload.role;
 }


getUserProfile(): Observable<UserProfile> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
  return this.http.get<UserProfile>(`${this.baseApiUrl}/api/user/user-profile`, { headers });
}

getUserIdFromToken(): string | null {
  const decodedToken = this.decodedToken();
  return decodedToken?.UserId || null;
}

confirmEmailToken(email: string, token: string): Observable<any> {
  const confirmationUrl = `${this.baseApiUrl}/api/user/confirm-email?email=${email}&token=${token}`;
  const body = { email, token };
  return this.http.post<any>(confirmationUrl, body);
}

reactivationEmail(email: string): Observable<any> {
  return this.http.get(`${this.baseApiUrl}/api/user/reactivation-email?email=${email}`);
}

  isAuthenticated(): boolean {
    return this.loggedIn;
  }
}
