import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Address } from '../interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = `${environment.apiUrl}/addresses`;

  constructor(private http: HttpClient) { }

  getAddresses(
    sort: string = 'id',
    order: string = 'asc',
    page: number = 1,
    itemsPerPage: number = 10
  ): Observable<{ items: Address[], totalItems: number }> {
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

  getAddress(id: string): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/${id}`);
  }

  createAddress(order: Address): Observable<Address> {
    return this.http.post<Address>(this.apiUrl, order);
  }

  updateAddress(order: Address): Observable<Address> {
    return this.http.put<Address>(`${this.apiUrl}/${order.id}`, order);
  }

  deleteAddress(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}