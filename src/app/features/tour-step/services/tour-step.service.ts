import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environment/environment';
import { TourStep } from '../interfaces/tourstep';

@Injectable({
  providedIn: 'root'
})
export class TourStepService {
  private apiUrl = `${environment.apiUrl}/tours`;

  constructor(private http: HttpClient) { }

  // getTours(
  //   sort: string = 'id',
  //   order: string = 'asc',
  //   page: number = 1,
  //   itemsPerPage: number = 10
  // ): Observable<{ items: Tour[], totalItems: number }> {
  //   let params = new HttpParams()
  //     .set('order[' + sort + ']', order)
  //     .set('page', page.toString())
  //     .set('itemsPerPage', itemsPerPage.toString());

  //   return this.http.get<any>(this.apiUrl, { params }).pipe(
  //     map(response => ({
  //       items: response['hydra:member'],
  //       totalItems: response['hydra:totalItems']
  //     }))
  //   );
  // }

  getTourStepsByTour(id: number): Observable<{ items: TourStep[] }> {
    let params = new HttpParams()
    return this.http.get<any>(`${this.apiUrl}/${id}/tour_steps`, { params }).pipe(
      map(response => ({
        items: response['hydra:member'],
      }))
    );
  }
  getTour(id: string): Observable<TourStep> {
    return this.http.get<TourStep>(`${this.apiUrl}/${id}`);
  }

  createTour(tour: TourStep): Observable<TourStep> {
    return this.http.post<TourStep>(this.apiUrl, tour);
  }

  updateTour(tour: TourStep): Observable<TourStep> {
    return this.http.put<TourStep>(`${this.apiUrl}${tour.id}`, tour);
  }

  deleteTour(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

  createTourStep(tourId: string, step: TourStep): Observable<TourStep> {
    return this.http.post<TourStep>(`${tourId}steps`, step);
  }
}
