import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
	selector: 'app-platform',
	templateUrl: './platform.component.html',
	styleUrls: ['./platform.component.scss'],
})
export class PlatformComponent implements OnInit {
	@ViewChild('sidenav') sidenav: MatSidenav | undefined;
	menus = [
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
		'MENU',
	];
	opened = false;
	childActivated = false;
	userName = 'Jose Dias';
	userId = '00001';
	originName = 'Solinca';

	constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {}

	sideNavVisibily() {
		this.sidenav?.toggle();
	}

	setSidenavStatus(event: boolean) {
		this.opened = event;
	}

	/**
	 * on username dropdown click
	 */
	usernameClick() {
		this.router.navigate([`./user_profile/${this.userId}`], {
			relativeTo: this.activatedRoute,
		});
	}

	/**
	 * on origin dropdown click
	 */
	originClick() {}

	/**
	 * on route child activated
	 */
	onActivateChild() {
		this.setSidenavStatus(false);
		this.childActivated = true;
	}

	/**
	 * on route child desactivated
	 */
	onDeactivateChild() {
		this.childActivated = false;
	}
}
