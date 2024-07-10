import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';
import { User } from '../../interfaces/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userUrl = `${environment.apiUrl}/users`;
  private apiUrl = `${environment.apiUrl}/auth`;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  public token = new BehaviorSubject<boolean>(this.isTokenAvailable());
  public user = new BehaviorSubject<User | null>(null);
  public username = new BehaviorSubject<string | null>(null);

  /**
   * Constructor for AuthService
   * @param http - HttpClient for making HTTP requests
   * @param router - Router for navigation
   */
  constructor(private http: HttpClient, private router: Router) {
    if (this.isTokenAvailable()) {
      this.decodeToken();
    }
  }

  /**
   * Logs in a user with the provided form data.
   * @param form - The login form data
   * @returns An Observable that emits the authentication token as a string
   * @throws Error if the form is missing
   */
  public login(form: any): Observable<string> {
    if (!form) {
      throw new Error('Form is missing');
    }
    return this.http.post<any>(this.apiUrl, form, { headers: this.headers })
      .pipe(
        map(response => this.handleLoginResponse(response))
      );
  }

  /**
   * Registers a new user with the provided form data.
   * @param form - The registration form data
   * @returns An Observable that emits the response from the server
   */
  public register(form: any): Observable<string> {
    return this.http.post<any>(this.userUrl, form, { headers: this.headers });
  }

  /**
   * Logs out the current user.
   */
  public logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  /**
   * Retrieves the token from session storage.
   * @returns The token as a string, or null if no token is found
   */
  public getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  /**
   * Sets the token in session storage and decodes the token to extract the username.
   * @param token - The authentication token
   */
  public setToken(token: string): void {
    sessionStorage.setItem('token', token);
    this.token.next(true);
    this.decodeToken();
  }

  /**
   * Checks if a token is available in session storage.
   * @returns A boolean indicating whether a token is available
   */
  public isTokenAvailable(): boolean {
    return !!this.getToken();
  }

  /**
   * Handles the login response from the server.
   * @param response - The response from the server
   * @returns The authentication token
   * @throws Error if the response is invalid or does not contain a token
   */
  private handleLoginResponse(response: any): string {
    if (!response || !response.token) {
      throw new Error('Invalid response from server');
    }

    sessionStorage.removeItem('token');
    this.setToken(response.token);
    this.token.next(true);

    return response.token;
  }

  /**
   * Clears the session by removing the token and user information from session storage and BehaviorSubjects.
   */
  private clearSession(): void {
    this.token.next(false);
    this.user.next(null);
    this.username.next(null);
    sessionStorage.removeItem('token');
  }

  /**
   * Decodes the token stored in session storage to extract the username.
   */
  private decodeToken(): void {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      this.username.next(decoded.username);
    }
  }
}
