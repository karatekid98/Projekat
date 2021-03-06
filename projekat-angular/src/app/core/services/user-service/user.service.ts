import { UserForm } from 'src/app/models/singup';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { PaginationResponse } from '../../../models/paginationResponse';
import { Invoice } from '../../../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id: any): Observable<User>  {
    return this.http.get<User>(`http://localhost:28846/api/User/${id}`);
  }

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

  addUser(singupForm: UserForm): Observable<User> {
    return this.http.post<User>(`http://localhost:28846/api/User/singUp`, singupForm);
  }

  getUserAddress(id: any): Observable<Address> {
    return this.http.get<Address>(`http://localhost:28846/api/User/getUserAddress/${id}`);
  }

  getUserInvoices(id: any): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`http://localhost:28846/api/User/GetUserInvoices/${id}`);
  }

  updateUser(user: User, id: any): Observable<User> {
    return this.http.put<User>(`http://localhost:28846/api/User/${id}`, user);
  }

  undoDeleteUser(id: any): Observable<User> {
    return this.http.patch<User>(`http://localhost:28846/api/User/${id}`, id);
  }
}
