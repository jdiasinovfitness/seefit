import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PermissionsService {
  constructor(private http: HttpClient) {}

  getUserApps() {}
}
