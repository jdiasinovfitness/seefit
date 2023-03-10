import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {
  // default employes json path
  private interactionsJsonPath = 'assets/mockData/interactions.json';
  constructor(private http: HttpClient) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }
  /**
   * Handle request's and support with mock data.
   * @param req
   * @param next
   */
  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
    const { url, method } = req;
    if (url.endsWith('/employes') && method === 'GET') {
      req = req.clone({
        url: this.interactionsJsonPath,
      });
      return next.handle(req).pipe(delay(500));
    }
    if (url.endsWith('/auth/login') && method === 'POST') {
      const { body } = req.clone();
      // assign a new uuid to new employee
      body.id = Math.random().toString();
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
    }
    // if there is not any matches return default request.
    return next.handle(req);
  }
  /**
   * Get Employee unique uuid from url.
   * @param url
   */
  getEmployeeId(url: any) {
    const urlValues = url.split('/');
    return urlValues[urlValues.length - 1];
  }
}
