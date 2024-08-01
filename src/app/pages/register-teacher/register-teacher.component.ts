import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/core/models/register.model';
import { UserService } from 'src/app/core/services/user.service';
import { mustContainAtLeastOneSpecialCharacter, mustContainEmailDomain } from '../utils-validators/validator-functions';


@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.scss']
})
export class RegisterTeacherComponent {

  hide: boolean = true;
  errorInfo = "";

  constructor(private readonly userService: UserService, private readonly router: Router) {}

  registerForm : FormGroup = new FormGroup({
    firstname: new FormControl("", [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+$')
    ]),
    lastname: new FormControl("", [
      Validators.required,
      Validators.pattern('^[A-Za-z]+$')
    ]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.maxLength(10),
      Validators.minLength(10)
    ]),
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ]),
    email: new FormControl("", [
      Validators.required,
      mustContainEmailDomain
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      mustContainAtLeastOneSpecialCharacter
    ]),

  });

  get isControlNotProvided() {
    return (controlName: string) => {
      return this.registerForm.controls[controlName].touched &&
      this.registerForm.controls[controlName].hasError('required')
    };
  }

  get isNamePatternInvalid() {
    return (controlName: string) => {
      return this.registerForm.controls[controlName].touched &&
      this.registerForm.controls[controlName].hasError('pattern')
    };
  }

  get isControlAtLeastXCharacters() {
    return (controlName: string, length:number) => {
      return this.registerForm.controls[controlName].touched && 
      this.registerForm.controls[controlName].hasError('minlength');
    }
  }

  get isControlMaxXCharacters() {
    return (controlName: string, length:number) => {
      return this.registerForm.controls[controlName].touched && 
      this.registerForm.controls[controlName].hasError('maxlength');
    }
  }

  get isEmailInCorrectFormat() {
    return this.registerForm.controls['email'].touched && 
    this.registerForm.controls['email'].hasError('doesNotContainEmailDomain');
  }

  get isPasswordInCorrectFormat() {
    return this.registerForm.controls['password'].touched &&
    this.registerForm.controls['password'].hasError('doesNotContainSpecialCharacter');
  }

  onSubmit(){

    if(this.registerForm.valid) {
      let registerDto : RegisterDto = this.registerForm.getRawValue();
      console.log(registerDto);
     
      this.userService.register(registerDto, "teacher").subscribe({
        next: (result) => {
          if (result.success) {
            console.log('Registration successful');
            this.router.navigateByUrl(''); 
          }
        },
        error: (e) => {
          console.error(e.error.message);
          this.errorInfo = e.error;
        },
      });
      
    }
  }
}
