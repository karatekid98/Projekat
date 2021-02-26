import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../../models/login';
import { User } from '../../../models/user';
import { SingUp } from '../../../models/singup';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //TODO: add login method in C#
  login(loginForm: Login): Observable<User> {
    return this.http.post<User>(`http://localhost:57339/api/User/Login`, loginForm);
  }


  singup(singupForm: SingUp): Observable<SingUp> {
    return this.http.post<SingUp>(`http://localhost:28846/api/User/singUp`, singupForm);
  }
}
