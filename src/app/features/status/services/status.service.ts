import { Status } from '../interfaces/status';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private apiUrl = `${environment.apiUrl}/statuses`;

  constructor(private http: HttpClient) { }

  getStatuses(
    sort: string = 'id',
    status: string = 'asc',
    page: number = 1,
    itemsPerPage: number = 10
  ): Observable<{ items: Status[], totalItems: number }> {
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

  getStatus(id: string): Observable<Status> {
    return this.http.get<Status>(`${this.apiUrl}/${id}`);
  }

  createStatus(status: Status): Observable<Status> {
    return this.http.post<Status>(this.apiUrl, status);
  }

  updateStatus(status: Status): Observable<Status> {
    return this.http.put<Status>(`${this.apiUrl}/${status.id}`, status);
  }

  deleteStatus(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}