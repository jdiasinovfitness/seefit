import { Injectable } from '@angular/core';

@Injectable()
export class GlobalStorage {
	constructor() {}

	clear(): void {
		localStorage.clear();
	}
	getItem(key: string): string | null {
		return localStorage.getItem(key);
	}
	key(index: number): string | null {
		return localStorage.key(index);
	}
	removeItem(key: string): void {
		localStorage.removeItem(key);
	}
	setItem(key: string, value: string): void {
		localStorage.setItem(key, value);
	}
}
