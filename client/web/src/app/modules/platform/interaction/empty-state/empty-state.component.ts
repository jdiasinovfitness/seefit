import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-empty-state',
	templateUrl: './empty-state.component.html',
	styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent {
	@Input() title!: string;
	@Input() footer!: string;
	@Input() type!: string;

	constructor() {}

	getImage() {
		let src =
			this.type === 'error'
				? '../../../../../assets/images/errorState.png'
				: '../../../../../assets/images/emptyState.png';
		return src;
	}
}
