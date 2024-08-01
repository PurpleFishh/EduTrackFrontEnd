import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginDto } from 'src/app/core/models/login.model';
import { ResultError, StatusCodes } from 'src/app/core/models/result.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
})
export class RecoveryComponent {
  hide = true;
  firstSubmited = false;
  logginInfo: ResultError = { status: StatusCodes.Info, message: '' };

  formValues: unknown;
  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      //Validators.email
    ]),
  });

  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.firstSubmited = false;
  }

  onSubmit() {
    this.firstSubmited = true;
    this.logginInfo = { status: StatusCodes.Info, message: 'Please wait...' };
    if (this.form.valid) {
      this.authService
        .recovery(this.form.value['email'])
        .pipe(
          catchError((err) => {
            if(err.status == 500)
              return throwError(() => new Error('Invalid email. Please try again.'));
            return throwError(() => new Error('Something went wrong. Please try again.'));
          })
        )
        .subscribe({
          next: (token) => {
            console.log('Recovery email sent');
            this.router.navigateByUrl('');
          },
          error: (e) => {
            console.log('Error', e);
            this.logginInfo = { status: StatusCodes.Error, message: e.message };
          },
        });
    }
  }
}
