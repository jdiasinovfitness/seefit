import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  private authService: AuthService | undefined;

  private refresh_token = false;

  constructor(private inj: Injector, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    try {
      if (req.url.indexOf('auth') !== -1) {
        return next.handle(req);
      }
      return next.handle(this.addToken(req)).pipe(
        catchError((err) => {
          if (!this.isUnauthorized(err)) {
            this.refresh_token = false;
            return throwError(() => new Error(err));
          }

          if (this.refresh_token) {
            setTimeout(() => {
              this.refresh_token = false;
            }, 1000);
            return next.handle(this.addToken(req));
          }

          return from(this.getNewToken()).pipe(
            mergeMap(() => next.handle(this.addToken(req)))
          );
        })
      );
    } catch (err) {
      return next.handle(req);
    }
  }

  addToken(original_request: HttpRequest<any>): HttpRequest<any> {
    if (!this.authService) {
      this.authService = this.inj.get(AuthService);
    }
    const token = this.authService.token;

    if (!token) {
      return original_request;
    }

    return original_request.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    });
  }

  isUnauthorized(err: HttpErrorResponse) {
    return err instanceof HttpErrorResponse && 401 === err.status;
  }

  getNewToken(): Promise<any> {
    if (!this.authService) {
      this.authService = this.inj.get(AuthService);
    }
    return this.authService
      .postRefreshToken()
      .then((a) => {
        this.refresh_token = false;
        return a;
      })
      .catch((err) => {
        this.refresh_token = false;
        this.inj.get(Router).navigate(['/']);
        throw err;
      });
  }
}
