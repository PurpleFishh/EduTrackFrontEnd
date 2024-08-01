import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private readonly auth: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([0, 401, 403].includes(err.status) && this.auth.isLogged()) {
                // auto logout if 401 or 403 response returned from api

                this.auth.logout();
            }

            const error = err.error?.message || err.statusText;
            return throwError(() => error);
        }))
    }
}