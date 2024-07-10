import { HttpEvent, HttpHandlerFn, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const authService = inject(AuthService);
    const authToken = authService.getToken();

    if (authToken) {
        req = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authToken}`),
        });
    }

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                // Token expiré ou utilisateur non autorisé
                authService.logout();
            }
            return throwError(() => new Error(error.message));
        })
    );
}
