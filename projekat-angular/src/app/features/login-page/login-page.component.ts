import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login-service/login.service';
import { Login } from '../../models/login';
import { User } from '../../models/user';
import { SingUp } from '../../models/singup';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public singup: SingUp = {
    AddressDto: {
      country: '',
      city: '',
      line: '',
      postcode: ''
    },
    UserDto: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      gender: '',
      dateOfBirth: new Date
    }
  };
  public login: Login = {
    email: '',
    password: '',
  };

  email: string = '';
  gender = ['Female', 'Male'];

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
    postcode: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    line: new FormControl('', Validators.required),
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
  confirmhide = true;


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
        console.log(this.singup);
        console.log(error.error);
      }
    );
  }

  fillOutForm(): void {
    this.singup.UserDto.firstName = this.singupForm.value.firstName;
    this.singup.UserDto.lastName = this.singupForm.value.lastName;
    this.singup.UserDto.gender = this.singupForm.value.gender;
    this.singup.UserDto.dateOfBirth = this.singupForm.value.dateOfBirth;
    this.singup.UserDto.email = this.singupForm.value.emailSingUp;
    this.singup.UserDto.phone = this.singupForm.value.phoneNumber;
    this.singup.UserDto.password = this.singupForm.value.passwordSingUp;
    this.singup.AddressDto.country = this.singupForm.value.country;
    this.singup.AddressDto.city = this.singupForm.value.city;
    this.singup.AddressDto.postcode = this.singupForm.value.postcode;
    this.singup.AddressDto.line = this.singupForm.value.line;
  }

  checkDate() {
    if (this.isDateChecked) {
      this.singupForm.controls['dateOfBirth'].disable();
    } else {
      this.singupForm.controls['dateOfBirth'].enable();
    }
  }
}
