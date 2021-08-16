import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse } from 'src/app/models/paginationResponse';
import { Invoice } from '../../../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }


  getInvoice(id: any): Observable<Invoice>  {
    return this.http.get<Invoice>(`http://localhost:28846/api/Invoice/${id}`);
  }

  getInvoices(parametars: any): Observable<PaginationResponse<Invoice[]>>  {
    return this.http.get<PaginationResponse<Invoice[]>>(`http://localhost:28846/api/Invoice?pageNumber=${parametars.pageNumber}&pageSize=${parametars.pageSize}`);
  }

  getDeletedInvoices(parametars: any): Observable<PaginationResponse<Invoice[]>>  {
    return this.http.get<PaginationResponse<Invoice[]>>(`http://localhost:28846/api/Invoice/getDeletedInvoices?pageNumber=${parametars.pageNumber}&pageSize=${parametars.pageSize}`);
  }

  getCustomer(parametars: any): Observable<PaginationResponse<Invoice[]>>  {
    return this.http.get<PaginationResponse<Invoice[]>>(`http://localhost:28846/api/Invoice?pageNumber=${parametars.pageNumber}&pageSize=${parametars.pageSize}`);
  }

  softDeleteInvoice(id: any): Observable<{}>  {
    return this.http.patch(`http://localhost:28846/api/Invoice/softDelete/${id}`, id);
  }

  deleteInvoice(id: any): Observable<{}>  {
    return this.http.delete(`http://localhost:28846/api/Invoice/softDelete/${id}`);
  }

  addInvoice(invoiceForm: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`http://localhost:28846/api/Invoice/`, invoiceForm);
  }


  // TODO: create update form in ts file and fix this method
  updateInvoice(updateForm: Invoice, id: any): Observable<Invoice> {
    return this.http.put<Invoice>(`http://localhost:28846/api/Invoice/${id}`, updateForm);
  }

  undoDeleteInvoice(id: any): Observable<Invoice> {
    return this.http.patch<Invoice>(`http://localhost:28846/api/Invoice/${id}`, id);
  }
}
