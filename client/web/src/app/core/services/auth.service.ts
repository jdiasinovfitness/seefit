import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GlobalStorage } from '../storage/global.storage';
import { ConfigService } from './config.service';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';
import { AuthInfo } from '../interfaces/auth-info.model';

export class UserEntity {
  private id: string | undefined;
  private email: string | undefined;
  private name: string | undefined;

  constructor(id?: string, email?: string, name?: string) {
    this.id = id;
    (this.email = email), (this.name = name);
  }

  get userId() {
    return this.id;
  }
  get userName() {
    return this.name;
  }
  get userEmail() {
    return this.email;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken = '';
  private initialData: string[] = ['t'];
  private user: UserEntity | undefined;

  constructor(
    @Inject(GlobalStorage) private appStorage: Storage,
    private http: HttpClient,
    private config: ConfigService,
    private router: Router
  ) {
    this.authToken = this.initialData[0];
  }

  /* - Access methods and access functions - */

  get token() {
    return this.authToken ? this.authToken : '';
  }
  set token(token: string) {
    this.authToken = token;
  }

  isAuthenticated(): boolean {
    return true;
  }

  /* - Functions - */

  async login(formValue: {
    email: string;
    password: string;
  }): Promise<AuthInfo> {
    //TODO: api call to authentication in order to retrieve the access token
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

    this.setStorageItem('t', r.acessToken);
    this.setUserInfo(r);
    return r;
  }

  logOut() {
    this.token = '';
    this.appStorage.clear();
    this.router.navigate(['/auth/login']);
  }
  private getStorageItem(key: string): any {
    return this.appStorage.getItem(key);
  }

  private setStorageItem(key: string, value: string): void {
    this.appStorage.setItem(key, value);
    if (key === 'token') {
      this.token = value;
    }
  }

  refreshToken() {}

  setUserInfo(loginInfo: AuthInfo) {
    this.user = new UserEntity(loginInfo.id, loginInfo.email, loginInfo.email);
    console.log('USERRR', this.user);
  }

  getUserInfo(): UserEntity | undefined {
    console.log('THISUSSSSSER', this.user);
    return this.user;
  }
}
