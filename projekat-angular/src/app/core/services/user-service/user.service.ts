import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(parametars: any): Observable<User[]>  {
    return this.http.get<User[]>(`http://localhost:28846/api/User?pageNumber=${parametars.pageNumber}&pageSize=${parametars.pageSize}`);
  }
}
