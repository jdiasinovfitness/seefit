import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GymnList, InitialConfigInfo } from '../interfaces/core.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private configSettings: InitialConfigInfo[] = [];
  private configChangeEmmiter = new BehaviorSubject<boolean | undefined>(
    undefined
  );
  configChangeEmmitter$ = this.configChangeEmmiter?.asObservable();

  constructor(private http: HttpClient) {}

  getApiUrl(): string {
    return environment.baseUrl;
  }

  getConfigData() {
    return this.configSettings;
  }

  setConfigData(data: InitialConfigInfo[]) {
    this.configSettings = data;
  }

  getGymnList() {
    let gymnsListTemp: Array<GymnList> = [];

    this.configSettings.map((conf_el) => {
      gymnsListTemp = gymnsListTemp.concat(conf_el.locations);
    });
    console.log('gymnList', gymnsListTemp);
    return Array.from(new Set(gymnsListTemp));
  }

  async fetchConfigData() {
    console.log('setConfig');
    const headers = {
      headers: new HttpHeaders().append(
        'authorization',
        `Bearer ${localStorage.getItem('t')}`
      ),
      params: {
        'api-version': '1',
      },
    };
    const e = await firstValueFrom(
      this.http.get<InitialConfigInfo[]>(`${this.getApiUrl()}/config`, headers)
    );
    this.configChangeEmmiter.next(true);
    this.setConfigData(e);
    return e;
  }
}
