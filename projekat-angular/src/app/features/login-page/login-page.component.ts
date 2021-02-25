import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login-service/login.service';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  email: string = "";

  login: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(3)]),
  });

  singup: FormGroup = new FormGroup({
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
  }

  get isDateChecked() {
    return this.singup.get('dateOfBirth');
  }

  get emailInput() {
    return this.login.get('email');
  }
  get passwordInput() {
    return this.login.get('password');
  }
  get emailInputSingup() {
    return this.singup.get('emailSingUp');
  }
  get passwordInputSingUp() {
    return this.singup.get('passwordSingUp');
  }
  get passwordInputConfirm() {
    return this.singup.get('confirmPassword');
  }


  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.checkDate();

  }
  checkDate() {
    if(this.isDateChecked) {
      this.singup.controls['dateOfBirth'].disable();
    } else {
      this.singup.controls['dateOfBirth'].enable();
    }
  }
}
