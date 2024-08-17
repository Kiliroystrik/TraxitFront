import { Unit } from '../interfaces/unit';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private apiUrl = `${environment.apiUrl}/units`;

  constructor(private http: HttpClient) { }

  getUnits(
    sort: string = 'id',
    status: string = 'asc',
    page: number = 1,
    itemsPerPage: number = 10
  ): Observable<{ items: Unit[], totalItems: number }> {
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

  getUnit(id: string): Observable<Unit> {
    return this.http.get<Unit>(`${this.apiUrl}/${id}`);
  }

  createUnit(status: Unit): Observable<Unit> {
    return this.http.post<Unit>(this.apiUrl, status);
  }

  updateUnit(status: Unit): Observable<Unit> {
    return this.http.put<Unit>(`${this.apiUrl}/${status.id}`, status);
  }

  deleteUnit(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}