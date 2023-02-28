import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { PlatformRoutingModule } from './platform-routing.module';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { loader } from 'src/app/core/i18n/transloco-loader';
import { PlatformComponent } from './platform.component';
import { MaterialExampleModule } from 'src/app/material.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { SharedModule } from 'src/app/core/shared.module';

@NgModule({
	declarations: [HomeComponent, PlatformComponent],
	imports: [
		CommonModule,
		PlatformRoutingModule,
		TranslocoModule,
		MaterialExampleModule,
		SharedModule,
	],
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
