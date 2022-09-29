import { Inject, Injectable } from '@angular/core';
import { GlobalStorage } from '../storage/global.storage';

@Injectable()
export class AuthService {
	private authToken: string = '';
	private initialData: string[] = ['t'];

	constructor(@Inject(GlobalStorage) private appStorage: Storage) {
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
		return !!this.token;
	}


	/* - Functions - */

	login(formValue: { email: string; password: string }) {
		//TODO: api call to authentication in order to retrieve the access token 
		this.setStorageItem('t', 'DummyToken');

	}

	logOut() {
		this.token = '';
		this.appStorage.clear();
		//TODO: missing route navigation ( here or the caller component)
	}
	private getStorageItem(key: string): any {
		return this.appStorage.getItem(key);
	}

	private setStorageItem(key: string, value: string): void {
		this.appStorage.setItem(key, value);
		if(key === 'token') {
			this.token = value;
		} 
	}
}
