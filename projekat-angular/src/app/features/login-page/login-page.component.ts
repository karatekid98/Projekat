import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login-service/login.service';
import { Login } from '../../models/login';
import { User } from '../../models/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public singup: User = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    gender: '',
    dateOfBirth: new Date,
    addressId: '',
    role: false,
  };

  email: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(3)]),
  });

  singupForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    emailSingUp: new FormControl('', [Validators.email, Validators.required]),
    passwordSingUp: new FormControl('', [
      Validators.required,
      Validators.min(3),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.min(3),
    ]),
  });
  hide = true;

  userLogin: Login = {
    email: '',
    password: '',
  };

  get isDateChecked() {
    return this.singupForm.get('dateOfBirth');
  }

  get emailInput() {
    return this.loginForm.get('email');
  }
  get passwordInput() {
    return this.loginForm.get('password');
  }
  get emailInputSingup() {
    return this.singupForm.get('emailSingUp');
  }
  get passwordInputSingUp() {
    return this.singupForm.get('passwordSingUp');
  }
  get passwordInputConfirm() {
    return this.singupForm.get('confirmPassword');
  }

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.checkDate();


  }

  finishLogin() {
    this.fillOutForm();
    this.loginService.singup(this.singup).subscribe(
      (response) => {
        console.log('radi');
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  fillOutForm(): void {
    this.singup.firstName = this.singupForm.value.firstName;
    this.singup.lastName = this.singupForm.value.lastName;
    this.singup.gender = this.singupForm.value.gender;
    this.singup.dateOfBirth = this.singupForm.value.dateOfBirth;
    this.singup.email = this.singupForm.value.emailSingUp;
    this.singup.phone = this.singupForm.value.phoneNumber;
    this.singup.role = false;
    this.singup.addressId = '4CD879FB-3A66-4414-97EE-924C64919F07';
    this.singup.password = this.singupForm.value.passwordSingUp;
  }

  checkDate() {
    if (this.isDateChecked) {
      this.singupForm.controls['dateOfBirth'].disable();
    } else {
      this.singupForm.controls['dateOfBirth'].enable();
    }
  }
}
