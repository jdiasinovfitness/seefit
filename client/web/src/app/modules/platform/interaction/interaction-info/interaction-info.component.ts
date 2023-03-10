import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-interaction-info',
	templateUrl: './interaction-info.component.html',
	styleUrls: ['./interaction-info.component.scss'],
})
export class InteractionInfoComponent {
	@Input() info!: any; // TODO: set correct model type after API available
	@Output() handleClick = new EventEmitter();

	constructor() {}

	onButtonClick(event: any) {
		this.handleClick.emit(event);
	}
}
