import { Injectable } from '@angular/core';
import { RestBaseService } from './rest-base.service';
import {LoginDto } from '../models/login.model';
import { LoggedCredentialsDto } from '../models/logged-credentials.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  readonly endpoint: string = 'Authentication';

  constructor(private readonly baseService: RestBaseService) {}

  public login(loginDto: LoginDto): void {
    this.baseService
      .add<LoggedCredentialsDto, LoginDto>(`${this.endpoint}/LoginUser`, loginDto)
      .subscribe((token : LoggedCredentialsDto) => {
        console.log(token);
        localStorage.setItem('token', token.jwtToken as string);
      });
  }

  public logout(): void {
    localStorage.removeItem('token');
  }

  public isLogged(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
