import { OrderStep } from './../interfaces/orderstep';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderStepService {
  private apiUrl = `${environment.apiUrl}/order_steps`;

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

  getOrderStepsByOrder(id: string): Observable<{ items: OrderStep[] }> {
    let params = new HttpParams()
    return this.http.get<any>(`${environment.apiUrl}/orders/${id}/order_steps`, { params }).pipe(
      map(response => ({
        items: response['hydra:member'],
      }))
    );
  }

  getOrderStep(id: string): Observable<OrderStep> {
    return this.http.get<OrderStep>(`${this.apiUrl}/${id}`);
  }

  createOrderStep(orderStep: OrderStep): Observable<OrderStep> {
    const headers = {
      'Content-Type': 'application/ld+json',
      'accept': 'application/ld+json'
    };
    return this.http.post<OrderStep>(this.apiUrl, orderStep, { headers });
  }

  updateOrderStep(orderStep: OrderStep): Observable<OrderStep> {
    const headers = {
      'Content-Type': 'application/ld+json',
      'accept': 'application/ld+json'
    };
    return this.http.put<OrderStep>(`${this.apiUrl}/${orderStep.id}`, orderStep, { headers });
  }

  deleteOrderStep(id: string): Observable<void> {
    const headers = {
      'Content-Type': 'application/ld+json',
      'accept': 'application/ld+json'
    };
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}