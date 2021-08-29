import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login-service/login.service';
import { Login } from '../../models/login';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public tokenKey = 'app_token';
  public login: Login = {
    email: '',
    password: '',
  };
  showMessage = false;
  message = '';
  hide = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(3)]),
  });

  matcher = new ErrorStateMatcher();

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  get emailInput(): any {
    return this.loginForm.get('email');
  }
  get passwordInput(): any {
    return this.loginForm.get('password');
  }

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
  }

  finishLogin(): void {
    this.loginService.login(this.loginForm.value).subscribe(
      (response) => {
        if (response != null) {
            this.router.navigate([`/admin-home-page`]);
            this.storeToLocalStorage(response);
        }
      },
      (error) => {
        this.showMessage = true;
        this.message = `The credentials you've entered don't seem to be valid. Try again.`;
        localStorage.setItem('isLoggedIn', 'false');
        console.log(error.error);
      }
    );
  }

  storeToLocalStorage(user): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userObject', JSON.stringify(user));
  }
}
