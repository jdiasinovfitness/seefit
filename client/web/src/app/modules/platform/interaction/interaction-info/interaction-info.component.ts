import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-interaction-info',
	templateUrl: './interaction-info.component.html',
	styleUrls: ['./interaction-info.component.scss'],
})
export class InteractionInfoComponent implements OnInit {
	@Input() info!: any; // TODO: set correct model type after API available

	constructor() {}

	ngOnInit(): void {}
}
