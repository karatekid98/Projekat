import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login-service/login.service';
import { Login } from '../../models/login';
import { computeMsgId } from '@angular/compiler';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {



  public login: Login = {
    email: '',
    password: '',
  };

  email: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(3)]),
  });


  hide = true;

  // get isDateChecked() {
  //   return this.singupForm.get('dateOfBirth');
  // }

  get emailInput() {
    return this.loginForm.get('email');
  }
  get passwordInput() {
    return this.loginForm.get('password');
  }


  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  finishLogin(): void {}

  fillOutForm(): void {
    this.singup.UserDto.firstName = this.singupForm.value.firstName;
    this.singup.UserDto.lastName = this.singupForm.value.lastName;
    this.singup.UserDto.gender = this.singupForm.value.gender;
    this.singup.UserDto.dateOfBirth = this.singupForm.value.date;
    this.singup.UserDto.email = this.singupForm.value.emailSingUp;
    this.singup.UserDto.phone = this.singupForm.value.phoneNumber;
    this.singup.UserDto.password = this.singupForm.value.passwordSingUp;
    this.singup.AddressDto.country = this.singupForm.value.country;
    this.singup.AddressDto.city = this.singupForm.value.city;
    this.singup.AddressDto.postcode = this.singupForm.value.postcode;
    this.singup.AddressDto.line = this.singupForm.value.line;
  }


}
