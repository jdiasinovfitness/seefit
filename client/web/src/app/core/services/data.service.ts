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
					primary: { label: 'HRU', color: 'red', value: '' },
					secondary: { label: 'SLP', value: '35%', color: 'bl2e' },
					imageUrl: '../../assets/icons/no-avatar.svg',
					consumerInfo: {
						customerRecord: {
							title: 'CUSTOMER RECORD:',
							content: [
								{ key: 'DATE OF BIRTH (AGE):', value: '02 de Fevereiro de (41)' },
								{ key: 'OBJECTIVE:', value: 'Perda de Peso' },
								{ key: 'ACCESS (7 / 30 / 60 DAYS):', value: '1/4/9' },
								{
									key: 'MEMBERSHIP DATE (MONTHS TILL RENEWAL):',
									value: '30/04/2017',
								},
								{ key: 'LAST AF:', value: 'Não Existe' },
								{ key: 'LENGTH OF VISIT:', value: '75 minutes' },
							],
						},
						contractType: {
							title: 'TYPE OF CONTRACT:',
							content: [
								{ key: 'TYPE OF SUBSCRIPTION:', value: '6,99€ / Semanal' },
								{ key: 'SCHEDULE:', value: '07:00 até 18:00 - 20:30 até 22:00' },
								{ key: 'ADDITIONAL SERVICES:', value: 'n/a' },
							],
						},
						additionalInfo: {
							title: 'ADDITIONAL INFORMATION:',
							icons: ['apple', 'refresh', 'chevron-down'],
							lifeCycle: {
								key: 'LIFE CYCLE: Iniciado em:',
								value: '08/04/2021',
							},
						},
					},
				},
			] as Array<ICIData>);
		});
	}
}
