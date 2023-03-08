import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService, UserEntity } from 'src/app/core/services/auth.service';

@Component({
	selector: 'app-platform',
	templateUrl: './platform.component.html',
	styleUrls: ['./platform.component.scss'],
})
export class PlatformComponent implements OnInit {
	@ViewChild('sidenav') sidenav: MatSidenav | undefined;

	permissions = [
		// object structure should represent the actual menu (menu/page)
		{
			appCode: 'Interactions', // this block has no connection to the app structure
			icon: 'interaction.svg',
			desc: [
				{
					lang: 'pt',
					text: 'Interações',
				},
				{
					lang: 'en',
					text: 'Interactions',
				},
			],
			permissions: [
				{
					// permissions: [A, B, C] - check if user has permission
					// app: X - check if origin has access to app
					permissionCode: 'ICI',
					desc: [
						{
							lang: 'pt',
							text: 'Interações em Ginásio',
						},
						{
							lang: 'en',
							text: 'In club interactions',
						},
					],
				},
				{
					permissionCode: 'OCI',
					desc: [
						{
							lang: 'pt',
							text: 'Interações fora Ginásio',
						},
						{
							lang: 'en',
							text: 'Off club interactions',
						},
					],
				},
				{
					permissionCode: 'POWER_BI',
				},
			],
		},
		{
			appCode: 'Trainning',
			icon: 'training.svg',
			desc: [
				{
					lang: 'pt',
					text: 'Plano de treino',
				},
				{
					lang: 'en',
					text: 'Training Plan',
				},
			],
			permissions: [
				{
					permissionCode: 'AF',
					desc: [
						{
							lang: 'pt',
							text: 'Interações em Ginásio',
						},
						{
							lang: 'en',
							text: 'In club interactions',
						},
					],
				},
				{
					permissionCode: 'PT',
					desc: [
						{
							lang: 'pt',
							text: 'Interações fora Ginásio',
						},
						{
							lang: 'en',
							text: 'Off club interactions',
						},
					],
				},
				{
					permissionCode: 'POWER_BI',
				},
			],
		},
	];
	opened = false;
	childActivated = true;
	originName = 'Solinca';

	user: UserEntity | undefined;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private auth: AuthService
	) {}

	ngOnInit(): void {
		this.user = this.auth.getUserInfo();
		console.log('User', this.user);
	}

	sideNavVisibily() {
		return;
		this.sidenav?.toggle();
	}

	setSidenavStatus(event: boolean) {
		this.opened = event;
	}

	/**
	 * on username dropdown click
	 */
	usernameClick() {
		this.router.navigate([`./user_profile/${this.user?.userId}`], {
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
