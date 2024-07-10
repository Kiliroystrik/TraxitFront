import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { Tour } from '../../interfaces/tour';
import { TourStep } from '../../interfaces/tourstep';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private apiUrl = `${environment.apiUrl}/tours`;

  constructor(private http: HttpClient) { }

  getTours(): Observable<Tour[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response['hydra:member'])
    );
  }

  getTour(id: string): Observable<Tour> {
    return this.http.get<Tour>(`${this.apiUrl}/${id}`);
  }

  createTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(this.apiUrl, tour);
  }

  updateTour(tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(`${this.apiUrl}${tour.id}`, tour);
  }

  deleteTour(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

  createTourStep(tourId: string, step: TourStep): Observable<TourStep> {
    return this.http.post<TourStep>(`${tourId}steps`, step);
  }
}
