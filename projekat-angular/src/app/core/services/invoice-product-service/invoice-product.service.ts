import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceProduct } from 'src/app/models/invoiceProduct';
import { PaginationResponse } from 'src/app/models/paginationResponse';

@Injectable({
  providedIn: 'root'
})
export class InvoiceProductService {
  constructor(private http: HttpClient) { }


  getInvoiceProduct(id: any): Observable<InvoiceProduct>  {
    return this.http.get<InvoiceProduct>(`http://localhost:28846/api/InvoiceProduct/${id}`);
  }

  getInvoiceProducts(parametars: any): Observable<PaginationResponse<InvoiceProduct[]>>  {
    return this.http.get<PaginationResponse<InvoiceProduct[]>>(`http://localhost:28846/api/InvoiceProduct?pageNumber=${parametars.pageNumber}&pageSize=${parametars.pageSize}`);
  }

  getOneInvoiceProducts(id: any): Observable<InvoiceProduct[]>{
    return this.http.get<InvoiceProduct[]>(`http://localhost:28846/api/InvoiceProduct/getAllProducts/${id}`);
  }

  getDeletedInvoiceProducts(parametars: any): Observable<PaginationResponse<InvoiceProduct[]>>  {
    return this.http.get<PaginationResponse<InvoiceProduct[]>>(`http://localhost:28846/api/InvoiceProduct/getDeletedInvoiceProducts?pageNumber=${parametars.pageNumber}&pageSize=${parametars.pageSize}`);
  }

  softDeleteInvoiceProducts(id: any): Observable<{}>  {
    return this.http.patch(`http://localhost:28846/api/InvoiceProduct/softDelete/${id}`, id);
  }

  deleteInvoiceProduct(id: any): Observable<{}>  {
    return this.http.delete(`http://localhost:28846/api/InvoiceProduct/softDelete/${id}`);
  }

  addInvoiceProduct(invoiceProductForm: InvoiceProduct): Observable<InvoiceProduct> {
    return this.http.post<InvoiceProduct>(`http://localhost:28846/api/InvoiceProduct/`, invoiceProductForm);
  }

  updateInvoiceProduct(updateForm: InvoiceProduct, id: any): Observable<InvoiceProduct> {
    return this.http.put<InvoiceProduct>(`http://localhost:28846/api/InvoiceProduct/${id}`, updateForm);
  }

  undoDeleteInvoiceProduct(id: any): Observable<InvoiceProduct> {
    return this.http.patch<InvoiceProduct>(`http://localhost:28846/api/InvoiceProduct/${id}`, id);
  }
}
