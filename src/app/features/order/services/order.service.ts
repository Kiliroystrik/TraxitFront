import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) { }

  getOrders(
    sort: string = 'id',
    order: string = 'asc',
    page: number = 1,
    itemsPerPage: number = 10
  ): Observable<{ items: Order[], totalItems: number }> {
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

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    const headers = {
      'Content-Type': 'application/ld+json',
      'accept': 'application/ld+json'
    };
    return this.http.post<Order>(this.apiUrl, order, { headers });
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${order.id}`, order);
  }

  patchOrder(orderId: string, clientIRI: string): Observable<Order> {
    const headers = {
      'Content-Type': 'application/merge-patch+json',
      'accept': 'application/ld+json'
    };
    const body = {
      client: clientIRI
    };
    return this.http.patch<Order>(`${this.apiUrl}/${orderId}`, body, { headers });
  }

  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
