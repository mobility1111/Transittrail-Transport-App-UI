import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return this.handleUnAuthorizedError(request, next);
        } else {
          // Do not override the error, pass it through
          return throwError(() => err);
        }
      })
    );
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.AccessToken = this.auth.getToken()!;
    tokenApiModel.RefreshToken = this.auth.getRefreshToken()!;

    return this.auth.renewToken(tokenApiModel).pipe(
      switchMap((data: TokenApiModel) => {
        this.auth.storeRefreshToken(data.RefreshToken);
        this.auth.storeToken(data.AccessToken);
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${data.AccessToken}` }
        });
        return next.handle(req);
      }),
      catchError((err) => {
        this.toastr.success("Session is expired, Please Login again");
        this.router.navigate(['login']);
        return throwError(() => err);
      })
    );
  }
}
