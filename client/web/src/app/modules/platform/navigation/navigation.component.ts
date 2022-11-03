import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
	constructor(private transloco: TranslocoService) {}

	ngOnInit(): void {}

	//set activate language
	public setActiveLang(lang: string) {
		this.transloco.setActiveLang(lang);
	}
}
