import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
	selector: 'app-observation',
	templateUrl: './observation.component.html',
	styleUrls: ['./observation.component.scss'],
})
export class ObservationComponent implements OnInit {
	@Input() userId!: string;
	@Output() handleClick = new EventEmitter();

	observation: string = '';

	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		this.fetchObsFromStorage();
	}

	fetchObsFromStorage() {
		// Persisting observation in localStorage for demo only
		let obs = '';
		try {
			obs = localStorage.getItem(this.userId) || '';
		} catch (error) {
			obs = '';
		}
		this.observation = obs;
	}

	onKeyUp(event: string) {
		// Persisting observation in localStorage for demo only
		this.dataService.updateObservation(event, this.userId);
		localStorage.setItem(this.userId, event);
	}

	onButtonClick(event: any) {
		console.log('ENENENEN', event); // TODO: Remove on PR!
	}
}
