import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from './config.service';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';
import { AuthInfo, RefreshInfo } from '../interfaces/auth-info.model';
import { UserService } from './user.service';
import { UserInfo } from '../interfaces/core.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken: string | undefined;
  private refreshAuthToken: string | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private config: ConfigService,
    private user: UserService
  ) {}

  /* - Access methods and access functions - */

  get token() {
    return this.authToken ? this.authToken : '';
  }
  set token(token: string) {
    this.authToken = token;
    localStorage.setItem('t', token);
  }

  get refreshToken() {
    return this.refreshAuthToken ? this.refreshAuthToken : '';
  }

  set refreshToken(token: string) {
    this.refreshAuthToken = token;
  }

  /* - Functions - */

  /**
   * Logins into the platform. API request  middleware to return the essencial data.
   * @param formValue
   * @returns accessToken
   * @returns refreshToken
   * @returns userId
   * @returns language
   */
  async login(formValue: {
    email: string;
    password: string;
  }): Promise<AuthInfo> {
    const authString = Buffer.from(
      `${formValue.email}:${formValue.password}`
    ).toString('base64');

    const headers = {
      headers: new HttpHeaders().append('authorization', `Basic ${authString}`),
      params: {
        'api-version': '1',
      },
    };
    const r = await firstValueFrom(
      this.http.post<AuthInfo>(
        `${this.config.getApiUrl()}/auth/login`,
        {},
        headers
      )
    ).catch((err) => {
      return Promise.reject(err);
    });
    localStorage.setItem('t', r.accessToken);
    localStorage.setItem('r_t', r.refreshToken || '');
    this.refreshAuthToken = r.refreshToken;
    this.user.setUserInfo(this.retrieveUserInfoObject(r));
    await this.config.fetchConfigData();

    return r;
  }

  logOut() {
    this.token = '';
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  async postRefreshToken() {
    const headers = {
      headers: new HttpHeaders()
        .append('content-type', 'application/json')
        .append('authorization', 'Bearer ' + this.refreshCredentials()),
      params: {
        'api-version': '1',
      },
    };

    const r_t = await firstValueFrom(
      this.http.post<RefreshInfo>(
        `${this.config.getApiUrl()}/auth/refresh`,
        {},
        headers
      )
    ).catch((err) => {
      return Promise.reject(err);
    });
    this.token = r_t.access_token;
    localStorage.setItem('t', this.token);
    console.log('TOKEN1', this.token);
    return r_t;
  }

  private refreshCredentials(): string | null {
    return localStorage.getItem('r_t');
  }

  public isAuthenticated() {
    return localStorage.getItem('t');
  }

  retrieveUserInfoObject(data: AuthInfo): UserInfo {
    return {
      name: data.name,
      language: data.language,
      id: data.userId,
    };
  }
}
