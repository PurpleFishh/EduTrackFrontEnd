import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/core/models/login.model';
import { ResultError, StatusCodes } from 'src/app/core/models/result.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  firstSubmited = false;
  logginInfo: ResultError = { status: StatusCodes.Info, message: '' };

  formValues: unknown;
  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      //Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      //Validators.minLength(6),
      //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
    ]),
  });

  constructor(private readonly authService: AuthenticationService, private readonly router: Router) {}

  ngOnInit(): void {
    this.firstSubmited = false;
  }

  onSubmit() {
    this.firstSubmited = true;
    this.logginInfo = { status: StatusCodes.Info, message: '' };
    if (this.form.valid) {
      let loginDo: LoginDto = this.form.getRawValue();
      this.authService.login(loginDo).subscribe({
        next: (token) => {
          this.router.navigateByUrl('');
        },
        error: (e) => {
          console.error(e.error.message);
          this.logginInfo = e.error;
        },
      });
    }
  }
}
