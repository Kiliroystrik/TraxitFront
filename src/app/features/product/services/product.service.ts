import { Product } from '../interfaces/product';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  getProducts(
    sort: string = 'id',
    status: string = 'asc',
    page: number = 1,
    itemsPerPage: number = 10
  ): Observable<{ items: Product[], totalItems: number }> {
    let params = new HttpParams()
      .set('status[' + sort + ']', status)
      .set('page', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => ({
        items: response['hydra:member'],
        totalItems: response['hydra:totalItems']
      }))
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(status: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, status);
  }

  updateProduct(status: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${status.id}`, status);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}