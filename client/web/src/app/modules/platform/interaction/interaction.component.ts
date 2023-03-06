import { Component, OnInit } from '@angular/core';
import { ICIData } from 'src/app/core/interfaces/icidata';
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

	// FIXME: refactor to sub component
	activeTab = '0';
	tabs = [
		{ title: 'Customer', id: 0, active: true },
		{ title: 'Interaction', id: 1, active: false },
		{ title: 'History', id: 2, active: false },
	];
	// FIXME: refactor to sub component

	searchValue = '';

	list: Array<ICIData> = [];
	filterList = [
		{
			label: 'EM CLUBE',
			checked: true,
			disabled: false,
		},
		{
			label: 'EXCLUIR AG',
			checked: !true,
			disabled: !false,
		},
		{
			label: 'EM ATRASO',
			checked: !true,
			disabled: !false,
		},
	];

	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		// this.currentPhase = Phases.loading;
		this.loadData();
	}

	// FIXME: refactor to sub component
	onTabChange(tab: string) {
		this.activeTab = tab;
	}
	// FIXME: refactor to sub component

	loadData() {
		this.currentPhase = Phases.loading;
		this.dataService
			.getICIData()
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
		console.log('newBa', newVal); // TODO: Remove on PR!
		this.searchValue = newVal;
		// TODO: implement array search for demo
	}

	handleFilterToggle(newState: boolean, index: number) {
		this.filterList[index].checked = newState;
	}
}
