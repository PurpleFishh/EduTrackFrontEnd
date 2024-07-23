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
  formValues: unknown;
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

 constructor(private readonly authService: AuthenticationService) {}

  onSubmit() {
    let loginDo: LoginDto = this.form.getRawValue();
    console.log(loginDo);
    this.authService.login(loginDo);
  }
}
