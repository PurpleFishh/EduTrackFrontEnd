import { Injectable } from '@angular/core';
import { RestBaseService } from './rest-base.service';
import { LoginDto, ResetPasswordDto } from '../models/login.model';
import { LoggedCredentialsDto } from '../models/logged-credentials.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Result, StatusCodes } from '../models/result.model';
import { environment } from 'src/app/environments/environment';
import { UserRoles } from '../models/user-role.model';
import { UserInfoDto } from '../models/user-info.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  readonly endpoint: string = 'Authentication';
  //userRole: UserRoles | undefined;

  constructor(private readonly baseService: RestBaseService) {
    if (localStorage.getItem('role') !== null)
      environment.userRole = localStorage.getItem('role') as UserRoles;
  }

  public login(loginDto: LoginDto): Observable<Result<LoggedCredentialsDto>> {
    return this.baseService
      .add<LoggedCredentialsDto, LoginDto>(
        `${this.endpoint}/LoginUser`,
        loginDto
      )
      .pipe(
        map((token) => {
          localStorage.setItem('token', token.jwtToken as string);
          localStorage.setItem('email', token.email);
          environment.userRole = token.role;
          localStorage.setItem('role', environment.userRole);
          return { success: true, value: token };
        }),
        catchError((error: HttpErrorResponse) => {
          let message = 'Invalid email or password';
          if (error.status === 500) {
            message = 'Server error: ' + error.message;
          }
          return throwError({
            success: false,
            error: {
              status: StatusCodes.Error,
              message: 'Invalid email or password',
            },
          });
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

  public recovery(email: string): Observable<boolean> {
    return this.baseService.add(
      `${this.endpoint}/RecoverPassword?email=${email}`,
      {}
    );
  }
  public reserPassword(token: string, reset: string): Observable<boolean> {
    return this.baseService.add(
      `${this.endpoint}/ResetPassword?token=${token}`,
      reset, true
    );
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    environment.userRole = UserRoles.Guest;
  }

  public getUserInfo(): Observable<UserInfoDto> {
    return this.baseService.get<UserInfoDto>(`${this.endpoint}/GetUserInfo`);
  }

  public isLogged(): boolean {
    return localStorage.getItem('token') !== null;
  }
  public getEmail(): string {
    return localStorage.getItem('email') !== null
      ? (localStorage.getItem('email') as string)
      : '';
  }

  public getUserRole(): UserRoles {
    return environment.userRole;
  }

  public isAdmin(): boolean {
    // if (localStorage.getItem('token') !== null) {
    //   let isAdmin: boolean = JSON.parse(
    //     atob(localStorage.getItem('token')?.split('.')[1] as string)
    //   )['admin'] as boolean;
    //   return isAdmin === true;
    // }
    // return false;
    return (
      this.isLogged() &&
      (localStorage.getItem('role') as UserRoles) === UserRoles.Admin
    );
  }

  public isTeacher(): boolean {
    // if (localStorage.getItem('token') !== null) {
    //   let isTeacher: boolean = JSON.parse(
    //     atob(localStorage.getItem('token')?.split('.')[1] as string)
    //   )['teacher'] as boolean;
    //   return isTeacher == true;
    // }
    // return false;
    return (
      this.isLogged() &&
      (localStorage.getItem('role') as UserRoles) === UserRoles.Teacher
    );
  }

  public isStudent(): boolean {
    // if (localStorage.getItem('token') !== null) {
    //   let payload = JSON.parse(
    //     atob(localStorage.getItem('token')?.split('.')[1] as string)
    //   );
    //   return !!payload['admin'] && !!payload['teacher'];
    // }
    // return false;
    return (
      this.isLogged() &&
      (localStorage.getItem('role') as UserRoles) === UserRoles.Student
    );
  }

  public isGuest(): boolean {
    return localStorage.getItem('token') === null;
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
