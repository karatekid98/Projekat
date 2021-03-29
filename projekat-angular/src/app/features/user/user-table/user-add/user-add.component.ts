import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SingUp } from 'src/app/models/singup';
import { User } from 'src/app/models/user';
import { UserService } from '../../../../core/services/user-service/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  public user: User = {
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: new Date(),
    gender: '',
    addressId: '',
    email: '',
    password: '',
    id: '',
    role: false
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

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // TODO: add message if passwords don't match
  finishSingup(): void {
    this.fillOutForm();
    this.userService.addUser(this.singup).subscribe(
      (response) => {
        this.user.firstName = response.firstName;
        this.user.lastName = response.lastName;
        this.user.gender = response.gender;
        this.user.dateOfBirth = response.dateOfBirth;
        this.user.password = response.password;
        this.user.email = response.email;
        this.user.phone = response.phone;
        this.openSnackBar();
        this.router.navigate(['admin-home-page/user']);
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

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

  openSnackBar(): void {
    this.snackBar.open('User successfully added!', 'Close', {
      duration: 2000,
      panelClass: ['snackbar']
    });

  }

  backToUserTable(): void  {
    this.router.navigate(['admin-home-page/user']);
  }

  checkPasswords(): boolean {
    if (this.passwordInputSingUp === this.passwordInputConfirm) {
      return true;
    } else {
      return false;
    }
  }
}
