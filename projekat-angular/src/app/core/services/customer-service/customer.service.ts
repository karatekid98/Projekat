import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { PaginationResponse } from 'src/app/models/paginationResponse';
import { CustomerForm } from '../../../models/customerForm';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }


  getCustomer(id: any): Observable<Customer>  {
    return this.http.get<Customer>(`http://localhost:28846/api/Customer/${id}`);
  }

  getCustomers(parametars: any): Observable<PaginationResponse<Customer[]>>  {
    return this.http.get<PaginationResponse<Customer[]>>(`http://localhost:28846/api/Customer?pageNumber=${parametars.pageNumber}&pageSize=${parametars.pageSize}`);
  }

  getDeletedCustomers(parametars: any): Observable<PaginationResponse<Customer[]>>  {
    return this.http.get<PaginationResponse<Customer[]>>(`http://localhost:28846/api/Customer/getDeletedCustomers?pageNumber=${parametars.pageNumber}&pageSize=${parametars.pageSize}`);
  }

  softDeleteCustomer(id: any): Observable<{}>  {
    return this.http.patch(`http://localhost:28846/api/Customer/softDelete/${id}`, id);
  }

  deleteCustomer(id: any): Observable<{}>  {
    return this.http.delete(`http://localhost:28846/api/Customer/softDelete/${id}`);
  }

  addCustomer(customerForm: CustomerForm): Observable<Customer> {
    return this.http.post<Customer>(`http://localhost:28846/api/Customer/singUp`, customerForm);
  }

  updateCustomer(updateForm: Customer, id: any): Observable<Customer> {
    return this.http.put<Customer>(`http://localhost:28846/api/Customer/${id}`, updateForm);
  }

  undoDeleteCustomer(id: any): Observable<Customer> {
    return this.http.patch<Customer>(`http://localhost:28846/api/Customer/${id}`, id);
  }
}
