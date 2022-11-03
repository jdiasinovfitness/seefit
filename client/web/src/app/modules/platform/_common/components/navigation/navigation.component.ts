import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslocoService } from '@ngneat/transloco';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
	events: string[] = [];
	opened: boolean = true;
	@ViewChild('sidebarControl') sidebarControl: MatSidenav | undefined;

	constructor(private transloco: TranslocoService) {}

	ngOnInit(): void {}

	//set activate language
	public setActiveLang(lang: string) {
		this.transloco.setActiveLang(lang);
	}

	toogleStatus() {
		this.sidebarControl?.toggle();
	}
}
{
}
