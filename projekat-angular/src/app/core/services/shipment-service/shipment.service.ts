import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse } from 'src/app/models/paginationResponse';
import { Shipment } from 'src/app/models/shipment';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(private http: HttpClient) { }


  getShipment(id: any): Observable<Shipment>  {
    return this.http.get<Shipment>(`http://localhost:28846/api/Shipment/${id}`);
  }

  getShipments(parametars: any): Observable<PaginationResponse<Shipment[]>>  {
    return this.http.get<PaginationResponse<Shipment[]>>(`http://localhost:28846/api/Shipment?pageNumber=${parametars.pageNumber}&pageSize=${parametars.pageSize}`);
  }

  getDeletedShipments(parametars: any): Observable<PaginationResponse<Shipment[]>>  {
    return this.http.get<PaginationResponse<Shipment[]>>(`http://localhost:28846/api/Shipment/getDeletedShipments?pageNumber=${parametars.pageNumber}&pageSize=${parametars.pageSize}`);
  }

  softDeleteShipment(id: any): Observable<{}>  {
    return this.http.patch(`http://localhost:28846/api/Shipment/softDelete/${id}`, id);
  }

  deleteShipment(id: any): Observable<{}>  {
    return this.http.delete(`http://localhost:28846/api/Shipment/softDelete/${id}`);
  }

  addShipment(shipmentForm: Shipment): Observable<Shipment> {
    return this.http.post<Shipment>(`http://localhost:28846/api/Shipment/`, shipmentForm);
  }

  updateShipment(updateForm: Shipment, id: any): Observable<Shipment> {
    return this.http.put<Shipment>(`http://localhost:28846/api/Shipment/${id}`, updateForm);
  }

  undoDeleteShipment(id: any): Observable<Shipment> {
    return this.http.patch<Shipment>(`http://localhost:28846/api/Shipment/${id}`, id);
  }
}
