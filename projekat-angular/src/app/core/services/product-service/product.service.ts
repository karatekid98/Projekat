import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse } from 'src/app/models/paginationResponse';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  getProduct(id: any): Observable<Product>  {
    return this.http.get<Product>(`http://localhost:28846/api/Product/${id}`);
  }

  getProducts(parametars: any): Observable<PaginationResponse<Product[]>>  {
    return this.http.get<PaginationResponse<Product[]>>(`http://localhost:28846/api/Product?pageNumber=${parametars.pageNumber}&pageSize=${parametars.pageSize}`);
  }

  getDeletedProducts(parametars: any): Observable<PaginationResponse<Product[]>>  {
    return this.http.get<PaginationResponse<Product[]>>(`http://localhost:28846/api/Product/getDeletedProducts?pageNumber=${parametars.pageNumber}&pageSize=${parametars.pageSize}`);
  }

  softDeleteProduct(id: any): Observable<{}>  {
    return this.http.patch(`http://localhost:28846/api/Product/softDelete/${id}`, id);
  }

  deleteProduct(id: any): Observable<{}>  {
    return this.http.delete(`http://localhost:28846/api/Product/softDelete/${id}`);
  }

  addProduct(productForm: Product): Observable<Product> {
    return this.http.post<Product>(`http://localhost:28846/api/Product/`, productForm);
  }

  // TODO: create update form in ts file and fix this method
  updateProduct(updateForm: Product, id: any): Observable<Product> {
    return this.http.put<Product>(`http://localhost:28846/api/Product/${id}`, updateForm);
  }

  undoDeleteProduct(id: any): Observable<Product> {
    return this.http.patch<Product>(`http://localhost:28846/api/Product/${id}`, id);
  }
}
