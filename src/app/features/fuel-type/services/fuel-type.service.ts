import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FuelType } from '../interfaces/fueltype';

@Injectable({
  providedIn: 'root'
})
export class FuelTypeService {
  private apiUrl = `${environment.apiUrl}/fuel_types`;

  constructor(private http: HttpClient) { }

  getFuelTypes(
    sort: string = 'id',
    order: string = 'asc',
    page: number = 1,
    itemsPerPage: number = 10
  ): Observable<{ items: FuelType[], totalItems: number }> {
    let params = new HttpParams()
      .set('order[' + sort + ']', order)
      .set('page', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => ({
        items: response['hydra:member'],
        totalItems: response['hydra:totalItems']
      }))
    );
  }

  getFuelType(id: string): Observable<FuelType> {
    return this.http.get<FuelType>(`${this.apiUrl}/${id}`);
  }

  createFuelType(order: FuelType): Observable<FuelType> {
    return this.http.post<FuelType>(this.apiUrl, order);
  }

  updateFuelType(order: FuelType): Observable<FuelType> {
    return this.http.put<FuelType>(`${this.apiUrl}/${order.id}`, order);
  }

  deleteFuelType(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}