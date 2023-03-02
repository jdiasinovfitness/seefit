import { Injectable } from '@angular/core';
import { ICIData } from '../interfaces/icidata';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	constructor() {}

	getICIData(): Promise<Array<ICIData>> {
		return new Promise((resolve, reject) => {
			resolve([
				{
					title: 'Augusto Santillan',
					userId: 'N#3929',
					date: '03-03-2021',
					interaction: {
						label: 'LAST INTERACTION:',
						value: 'Remarcar AFI',
						color: 'red',
					},
					primary: { label: 'HRU', color: 'red' },
					secondary: { label: 'SLP', value: '35%', color: 'bl2e' },
					imageUrl: '../../assets/icons/no-avatar.svg',
				},
			] as Array<ICIData>);
		});
	}
}
