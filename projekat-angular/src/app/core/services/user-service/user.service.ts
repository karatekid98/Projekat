import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SingUp } from 'src/app/models/singup';
import { User } from 'src/app/models/user';
import { PaginationResponse } from '../../../models/paginationResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(parametars: any): Observable<PaginationResponse<User[]>>  {
    return this.http.get<PaginationResponse<User[]>>(`http://localhost:28846/api/User?pageNumber=${parametars.pageNumber}&pageSize=${parametars.pageSize}`);
  }

  getDeletedUsers(parametars: any): Observable<PaginationResponse<User[]>>  {
    return this.http.get<PaginationResponse<User[]>>(`http://localhost:28846/api/User/getDeletedUsers?pageNumber=${parametars.pageNumber}&pageSize=${parametars.pageSize}`);
  }

  softDeleteUser(id: any): Observable<{}>  {
    return this.http.patch(`http://localhost:28846/api/User/softDelete/${id}`, id);
  }

  deleteUser(id: any): Observable<{}>  {
    return this.http.delete(`http://localhost:28846/api/User/softDelete/${id}`);
  }

  addUser(singupForm: SingUp): Observable<User> {
    return this.http.post<User>(`http://localhost:28846/api/User/singUp`, singupForm);
  }

}
