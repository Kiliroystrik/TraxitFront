import { OrderStep } from './../interfaces/orderstep';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) { }

  getOrderSteps(
    sort: string = 'id',
    order: string = 'asc',
    page: number = 1,
    itemsPerPage: number = 10
  ): Observable<{ items: OrderStep[], totalItems: number }> {
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

  getOrderStep(id: string): Observable<OrderStep> {
    return this.http.get<OrderStep>(`${this.apiUrl}/${id}`);
  }

  createOrderStep(order: OrderStep): Observable<OrderStep> {
    return this.http.post<OrderStep>(this.apiUrl, order);
  }

  updateOrderStep(order: OrderStep): Observable<OrderStep> {
    return this.http.put<OrderStep>(`${this.apiUrl}/${order.id}`, order);
  }

  deleteOrderStep(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}