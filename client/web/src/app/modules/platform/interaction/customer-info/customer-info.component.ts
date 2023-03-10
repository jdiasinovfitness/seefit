import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICIData } from 'src/app/core/interfaces/icidata';

@Component({
	selector: 'app-customer-info',
	templateUrl: './customer-info.component.html',
	styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent {
	@Input() info!: ICIData; // TODO: set correct model type after API available
	@Output() handleClick = new EventEmitter();

	constructor() {}

	onButtonClick(event: any) {
		this.handleClick.emit(event);
	}
}
