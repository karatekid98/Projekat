import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../../models/login';
import { User } from '../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(login: Login): Observable<User> {
    return this.http.post<User>(`http://localhost:28846/api/User/logIn`, login);
  }


}
