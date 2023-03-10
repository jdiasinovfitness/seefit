import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UnAuthGuardGuard implements CanLoad {
  constructor(private auth: AuthService) {}

  canLoad(): boolean {
    return this.auth.isAuthenticated();
  }
}
