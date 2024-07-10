import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Register } from '../../interfaces/Register';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  apiUrl = `${environment.apiUrl}/companies`;
  constructor(private http: HttpClient) { }

  firstRegistration(form: Register) {
    const headers = {
      'Content-Type': 'application/ld+json',
      'accept': 'application/ld+json'
    };
    return this.http.post(this.apiUrl, form, { headers });
  }
}
