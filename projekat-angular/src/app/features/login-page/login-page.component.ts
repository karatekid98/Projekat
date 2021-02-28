import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login-service/login.service';
import { Login } from '../../models/login';
import { computeMsgId } from '@angular/compiler';
import { Router } from '@angular/router';
import { User } from '../../models/user';

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


  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  finishLogin(): void {
    this.loginService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        if (response != null) {
          this.router.navigate([`/home-page/${response.id}`]);
        } else {
          console.log('user with that email and password does not exist');
        }

      },
      (error) => {
        console.log(error.error);
      }
    );
  }
}
