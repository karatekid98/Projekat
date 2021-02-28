import { Component, OnInit } from '@angular/core';
import { SingUp } from '../../models/singup';
import { LoginService } from '../../core/services/login-service/login.service';
import { User } from '../../models/user';
@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  public user: User = {
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: new Date(),
    gender: '',
    addressId: '',
    email: '',
    password: '',
  };

  public singup: SingUp = {
    AddressDto: {
      country: '',
      city: '',
      line: '',
      postcode: '',
    },
    UserDto: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      gender: '',
      dateOfBirth: new Date(),
    },
  };

  email: string = '';
  gender = ['Female', 'Male'];

  hide = true;
  confirmhide = true;

  singupForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
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

  get emailInputSingup() {
    return this.singupForm.get('emailSingUp');
  }
  get passwordInputSingUp() {
    return this.singupForm.get('passwordSingUp');
  }
  get passwordInputConfirm() {
    return this.singupForm.get('confirmPassword');
  }

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  // TODO: add message if passwords don't match
  finishSingup(): void {
    this.fillOutForm();
    this.loginService.singup(this.singup).subscribe(
      (response) => {
        this.user.firstName = response.firstName;
        this.user.lastName = response.lastName;
        this.user.gender = response.gender;
        this.user.dateOfBirth = response.dateOfBirth;
        this.user.password = response.password;
        this.user.email = response.email;
        this.user.phone = response.phone;
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  checkPasswords(): boolean {
    if (this.passwordInputSingUp === this.passwordInputConfirm) {
      return true;
    } else {
      return false;
    }
  }
}
