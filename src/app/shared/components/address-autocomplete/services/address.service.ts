import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'https://nominatim.openstreetmap.org/search'; // Exemple avec Nominatim

  constructor(private http: HttpClient) { }

  searchAddress(query: string): Observable<any[]> {
    const params = {
      q: query,
      format: 'json',
      addressdetails: '1',
      limit: '5'
    };
    return this.http.get<any[]>(this.apiUrl, { params });
  }
}
