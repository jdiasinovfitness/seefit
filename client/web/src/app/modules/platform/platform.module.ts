import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PlatformRoutingModule } from './platform-routing.module';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NavigationComponent } from './navigation/navigation.component';
import { loader } from 'src/app/core/services/i18n/transloco-loader';

@NgModule({
	declarations: [HomeComponent, NavigationComponent],
	imports: [CommonModule, PlatformRoutingModule, TranslocoModule],
	providers: [
		{
			provide: TRANSLOCO_SCOPE,
			useValue: {
				scope: 'platform',
				alias: 'plt',
				loader: loader((lang: any) => import(`./_common/i18n/${lang}.json`)),
			},
		},
	],
})
export class PlatformModule {}
