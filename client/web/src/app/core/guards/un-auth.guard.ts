import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UnAuthGuard implements CanLoad {
  constructor(private auth: AuthService) {}

  canLoad(): boolean {
    return this.auth.isAuthenticated();
  }
}
