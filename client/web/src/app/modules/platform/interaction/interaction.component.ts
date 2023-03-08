import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { firstValueFrom } from 'rxjs';
import { ICIData, ICIFilter } from 'src/app/core/interfaces/icidata';
import { DataService } from 'src/app/core/services/data.service';

export enum Phases {
	loading,
	empty,
	error,
	success,
}

@Component({
	selector: 'app-interaction',
	templateUrl: './interaction.component.html',
	styleUrls: ['./interaction.component.scss'],
})
export class InteractionComponent implements OnInit {
	phaseEnum = Phases;
	currentPhase = Phases.loading;

	list: Array<ICIData> = [];
	searchValue = '';
	activeTab = '0';
	tabs!: Array<any>;

	filterList!: Array<any>;

	constructor(
		private dataService: DataService,
		private translocoService: TranslocoService
	) {}

	ngOnInit(): void {
		this.init();
	}

	async init() {
		this.currentPhase = Phases.loading;

		this.tabs = [
			{
				title: await firstValueFrom(
					this.translocoService.selectTranslate('interaction.tabs.customer')
				),
				id: 0,
			},
			{
				title: await firstValueFrom(
					this.translocoService.selectTranslate('interaction.tabs.interaction')
				),
				id: 1,
			},
			{
				title: await firstValueFrom(
					this.translocoService.selectTranslate('interaction.tabs.history')
				),
				id: 2,
			},
		];

		this.filterList = [
			{
				id: 'inClub',
				label: 'interaction.filters.in-club',
				checked: true,
				disabled: false,
			},
			{
				id: 'excludeAG',
				label: 'interaction.filters.exclude-ag',
				checked: !true,
				disabled: !!false,
			},
			{
				id: 'expired',
				label: 'interaction.filters.expired',
				checked: !true,
				disabled: !!false,
			},
		] as any;

		this.loadData();
	}

	onTabChange(tab: string) {
		this.activeTab = tab;
	}

	loadData() {
		const filter = {
			search: this.searchValue,
		} as any;
		this.filterList.forEach((f: any) => (filter[f.id] = f.checked));

		this.currentPhase = Phases.loading;
		this.dataService
			.getICIData(filter)
			.then(res => {
				this.list = res?.length > 0 ? res : [];
				this.currentPhase = this.list?.length === 0 ? Phases.empty : Phases.success;
			})
			.catch(err => {
				console.error(err);
				this.currentPhase = Phases.error;
			});
	}

	handleSearch(newVal: string) {
		this.searchValue = newVal;
		this.loadData();
	}

	handleFilterToggle(newState: boolean, index: number) {
		this.filterList[index].checked = newState;
		this.loadData();
	}
}
