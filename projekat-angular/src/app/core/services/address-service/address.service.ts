import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse } from 'src/app/models/paginationResponse';
import { Address } from '../../../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }


  getAddress(id: any): Observable<Address>  {
    return this.http.get<Address>(`http://localhost:28846/api/Address/${id}`);
  }

  getAddresses(parametars: any): Observable<PaginationResponse<Address[]>>  {
    return this.http.get<PaginationResponse<Address[]>>(`http://localhost:28846/api/Address?pageNumber=${parametars.pageNumber}&pageSize=${parametars.pageSize}`);
  }

  getDeletedAddresses(parametars: any): Observable<PaginationResponse<Address[]>>  {
    return this.http.get<PaginationResponse<Address[]>>(`http://localhost:28846/api/Address/getDeletedAddresses?pageNumber=${parametars.pageNumber}&pageSize=${parametars.pageSize}`);
  }

  softDeleteAddress(id: any): Observable<{}>  {
    return this.http.patch(`http://localhost:28846/api/Address/softDelete/${id}`, id);
  }

  deleteAddress(id: any): Observable<{}>  {
    return this.http.delete(`http://localhost:28846/api/Address/softDelete/${id}`);
  }


  // fix address form
  addUser(addressForm: Address): Observable<Address> {
    return this.http.post<Address>(`http://localhost:28846/api/Address/singUp`, addressForm);
  }

  // TODO: create update form in ts file and fix this method
  updateAddress(updateForm: Address, id: any): Observable<Address> {
    return this.http.put<Address>(`http://localhost:28846/api/Address/${id}`, updateForm);
  }

  undoDeleteAddress(id: any): Observable<Address> {
    return this.http.patch<Address>(`http://localhost:28846/api/Address/${id}`, id);
  }
}
