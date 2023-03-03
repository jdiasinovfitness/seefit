import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ICIData } from 'src/app/core/interfaces/icidata';
import { DataService } from 'src/app/core/services/data.service';

@Component({
	selector: 'app-customer-info',
	templateUrl: './customer-info.component.html',
	styleUrls: ['./customer-info.component.scss'],
	encapsulation: ViewEncapsulation.ShadowDom,
})
export class CustomerInfoComponent implements OnInit {
	@Input() info!: ICIData; // TODO: set correct model type after API available
	observation: string = '';
	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		this.fetchObsFromStorage();
	}

	fetchObsFromStorage() {
		// Persisting observation in localStorage for demo only
		let obs = '';
		try {
			obs = localStorage.getItem(this.info.userId) || '';
		} catch (error) {
			obs = '';
		}
		this.observation = obs;
	}

	onKeyUp(event: string) {
		// Persisting observation in localStorage for demo only
		this.dataService.updateObservation(event, this.info.userId);
		localStorage.setItem(this.info.userId, event);
	}
	onButtonClick(event: any) {}
}
