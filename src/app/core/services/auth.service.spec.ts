import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { User } from '../../features/user/interfaces/user';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [AuthService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with token and user if token is available', () => {
    spyOn(service as any, 'decodeToken').and.callThrough();
    sessionStorage.setItem('token', 'dummy-token');
    service = TestBed.inject(AuthService); // Reinitialize the service
    expect(service.token.value).toBeTrue();
    expect((service as any).decodeToken).toHaveBeenCalled();
  });

  it('should login a user and set token', () => {
    const dummyResponse = { token: 'dummy-token' };
    service.login({ username: 'test', password: 'test' }).subscribe(token => {
      expect(token).toBe(dummyResponse.token);
      expect(service.token.value).toBeTrue();
      expect(service.getToken()).toBe(dummyResponse.token);
    });
    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should logout a user', () => {
    spyOn(router, 'navigate');
    service.logout();
    expect(service.token.value).toBeFalse();
    expect(service.user.value).toBeNull();
    expect(service.username.value).toBeNull();
    expect(sessionStorage.getItem('token')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set and get token', () => {
    service.setToken('dummy-token');
    expect(service.token.value).toBeTrue();
    expect(service.getToken()).toBe('dummy-token');
  });


});
