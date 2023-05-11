import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable()
export class ConfigService {
  getApiUrl(): string {
    return environment.baseUrl;
  }
}
