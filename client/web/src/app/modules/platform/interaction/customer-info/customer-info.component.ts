import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ICIData } from 'src/app/core/interfaces/icidata';

@Component({
	selector: 'app-customer-info',
	templateUrl: './customer-info.component.html',
	styleUrls: ['./customer-info.component.scss'],
	encapsulation: ViewEncapsulation.ShadowDom,
})
export class CustomerInfoComponent implements OnInit {
	@Input() info!: ICIData; // TODO: set correct model type after API available

	constructor() {}

	ngOnInit(): void {}

	onKeyUp(event: string) {}
	onButtonClick(event: any) {}
}
