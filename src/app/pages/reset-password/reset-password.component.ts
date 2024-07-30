import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ResetPasswordDto } from 'src/app/core/models/login.model';
import { ResultError, StatusCodes } from 'src/app/core/models/result.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  token!: string;
  hide = true;
  firstSubmited = false;
  logginInfo: ResultError = { status: StatusCodes.Info, message: '' };

  formValues: unknown;
  form: FormGroup = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      //Validators.email
    ]),
  });

  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router,
    private readonly activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {   
    this.activeRouter.queryParams.subscribe((params) => {
      if(!params['token'])
        this.router.navigateByUrl('/unauthorized');
      this.token = params['token'];

    });
    this.firstSubmited = false;
  }

  onSubmit() {
    this.firstSubmited = true;
    this.logginInfo = { status: StatusCodes.Info, message: 'Please wait...' };
    if (this.form.valid) {
      this.authService.reserPassword(this.token, JSON.stringify(this.form.value['password']))
      .pipe(
        catchError(err => {
          if(err.status == 500)
            return throwError(() => new Error('Invalid reset password session. Please try again.'));
          return throwError(() => new Error('Something went wrong. Please try again.'));
      }),
      )
      .subscribe({
        next: (token) => {
          console.log('Password reset');
          this.router.navigateByUrl('');
        },
        error: (e) => {
          console.log('Error', e);
          this.logginInfo = { status: StatusCodes.Error, message: e.message };
        }
      });
    }
  }
}
