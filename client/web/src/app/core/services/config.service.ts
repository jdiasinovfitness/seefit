import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class ConfigService {
  getApiUrl(): string {
    return environment.baseUrl;
  }
}
