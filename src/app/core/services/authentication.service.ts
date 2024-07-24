import { Injectable } from '@angular/core';
import { RestBaseService } from './rest-base.service';
import { LoginDto } from '../models/login.model';
import { LoggedCredentialsDto } from '../models/logged-credentials.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Result, StatusCodes } from '../models/result.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  readonly endpoint: string = 'Authentication';

  constructor(private readonly baseService: RestBaseService) {}

  public login(loginDto: LoginDto): Observable<Result<LoggedCredentialsDto>> {
    return this.baseService
      .add<LoggedCredentialsDto, LoginDto>(
        `${this.endpoint}/LoginUser`,
        loginDto
      ).pipe(
        map(token => ({ success: true, value: token })),
        catchError((error: HttpErrorResponse) => {
          let message = 'Invalid email or password';
          if (error.status === 500) {
            message = 'Server error: ' + error.message;
          }
          return throwError({ success: false, error: { status: StatusCodes.Error, message: "Invalid email or password" } });
        })
      );
      // .subscribe({
      //   next: (token: LoggedCredentialsDto) => {
      //     console.log(token);
      //     localStorage.setItem('token', token.jwtToken as string);
      //     return { success: true, value: token };
      //   },
      //   error: (e: HttpErrorResponse) => {
      //     if(e.status === 500) {
      //       console.error("eer" + e.message);
      //     }
      //     return { success: false, error: {status: StatusCodes.Error, message: "Invalid email or password"} };
      //   },
      //   complete: () => { return { success: false, error: {status: StatusCodes.Error, message: "No result"} };}
      // });
  }

  public logout(): void {
    localStorage.removeItem('token');
  }

  public isLogged(): boolean {
    return localStorage.getItem('token') !== null;
  }
}


 // .pipe(catchError((error: HttpErrorResponse) => {
      //   if (error.status === 0) {
      //     // A client-side or network error occurred. Handle it accordingly.
      //     console.error('An error occurred:', error.error);
      //   } else {
      //     // The backend returned an unsuccessful response code.
      //     // The response body may contain clues as to what went wrong.
      //     console.error(
      //       `Backend returned code ${error.status}, body was: `, error.message);
      //   }
      //   // Return an observable with a user-facing error message.
      //   return throwError(() => new Error('Something bad happened; please try again later.'));
      // }))