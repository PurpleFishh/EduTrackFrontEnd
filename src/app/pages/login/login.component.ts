import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginDto } from 'src/app/core/models/login.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  firstSubmited = false;
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

  constructor(private readonly authService: AuthenticationService) {}

  ngOnInit(): void {
    this.firstSubmited = false;
  }

  onSubmit() {
    this.firstSubmited = true;
    let loginDo: LoginDto = this.form.getRawValue();
    console.log(loginDo);
    this.authService.login(loginDo);
  }
}
