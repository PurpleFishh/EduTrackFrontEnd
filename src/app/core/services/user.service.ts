import { Injectable } from '@angular/core';
import { RestBaseService } from './rest-base.service';
import { RegisterDto } from '../models/register.model';
import { Observable,  throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Result, StatusCodes } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly endpoint: string = 'Authentication';

 constructor(private readonly baseService: RestBaseService) { }
 
  public register(registerDto: RegisterDto, userType: string): Observable<Result<boolean>> {
    let route="";
    if(userType == "user")
      route = `${this.endpoint}/RegisterUser`;
    else route = `${this.endpoint}/RegisterTeacher`;

    return this.baseService.post<boolean, RegisterDto>(route, registerDto)
      .pipe(
        map((result: boolean) => {
          return { success: true, value: result };
        }),
        catchError((error: HttpErrorResponse) => {
          let message = 'Registration failed';
          if (error.status === 500) {
            message = 'Server error: ' + error.message;
          }
          return throwError({
            success: false,
            error: {
              status: StatusCodes.Error,
              message: message,
            },
          });
        })
      );
  }

}
  /*
  public registerUser(user : RegisterDto): Observable<Result<string>> {

    return this.baseService.add<string, RegisterDto>(`${this.endpoint}/RegisterUser`,user)
    
    .pipe(
      catchError((error: HttpErrorResponse) => {
         let message = 'Invalid email or password';
          if (error.status === 500) {
            message = 'Server error: ' + error.message;
          }
          return throwError({
            success: false,
            error: {
              status: StatusCodes.Error,
              message: message,
            },
          });
      })
    );*/
    /*
    .subscribe({
      next: (message) => {
        console.log(message);
        //this.router.navigateByUrl('');
      },
      error: (e) => {
        console.error(e.error.message);
        //this.logginInfo = e.error;
      },
    });
  }*/

