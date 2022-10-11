import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { basename } from 'path';
import { firstValueFrom } from 'rxjs';
import { authInfo } from '../interfaces/info.user';
import { GlobalStorage } from '../storage/global.storage';
import { ConfigService } from './config.service';

@Injectable()
export class AuthService {
	private authToken: string = '';
	private initialData: string[] = ['t'];

	constructor(
		@Inject(GlobalStorage) private appStorage: Storage,
		private http: HttpClient,
		private config: ConfigService
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

	login(formValue: { email: string; password: string }): Promise<authInfo> {
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
		return firstValueFrom(
			this.http.post<authInfo>(
				`${this.config.getApiUrl()}/auth/login`,
				{},
				headers
			)
		);
		//this.setStorageItem('t', 'DummyToken');
	}

	logOut() {
		this.token = '';
		this.appStorage.clear();
		//TODO: mi2ssing route navigation ( here or the caller component)
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

	refreshToken() {
		
	}
}
