import { Injectable } from '@angular/core';
import { ICIData, ICIFilter } from '../interfaces/icidata';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	data!: Array<ICIData>;

	constructor() {
		this.setDummyData();
	}

	updateObservation(newState: string, id: string) {
		const index = this.data.findIndex(el => {
			el.userId === id;
		});
		if (index === -1) {
			return;
		}

		this.data[index].customerInfo.observation = newState;
	}

	getICIData(filter?: ICIFilter): Promise<Array<ICIData>> {
		return new Promise((resolve, reject) => {
			if (!filter) {
				resolve(this.data);
				return;
			}

			// With filter for inClub, excludeAG, expired, name, id, date, interaction.
			const res = this.data.filter(
				el =>
					el.inClub === filter.inClub &&
					el.excludeAG === filter.excludeAG &&
					el.expired === filter.expired &&
					JSON.stringify(el)
						.toLocaleLowerCase()
						.includes(filter.search.toLocaleLowerCase())
			);
			resolve(res);
		});
	}

	setDummyData() {
		this.data = [
			{
				title: 'Augusto Santillan',
				userId: 'N#3929',
				inClub: true,
				excludeAG: false,
				expired: false,
				date: '03-03-2021',
				interaction: {
					label: 'LAST INTERACTION:',
					value: 'Remarcar AFI',
					color: 'red',
				},
				primary: { label: 'HRU', color: 'red', value: '' },
				secondary: { label: 'SLP', value: '35%', color: 'bl2e' },
				imageUrl: '../../assets/icons/no-avatar.svg',
				customerInfo: {
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
							progress: 25,
							topLabels: [
								{ label: '0', position: 0 },
								{ label: '45', position: 25 },
								{ label: '90', position: 50 },
								{ label: '135', position: 75 },
								{ label: '180', position: 95 },
							],
							bottomLabels: [
								{ label: 'CYG', position: 0 },
								{ label: 'CYG', position: 25 },
								{ label: 'WYL', position: 50 },
								{ label: 'WYL', position: 75 },
								{ label: 'WYL', position: 95 },
							],
						},
					},
					observation: '',
				},
			},
		];
	}
}
