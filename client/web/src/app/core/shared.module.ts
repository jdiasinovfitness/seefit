import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { GlobalStorage } from './storage/global.storage';
import { ConfigService } from './services/config.service';
import { MaterialExampleModule } from '../material.module';
import { UiComponentsModule } from '@i9r/ui-components';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MaterialExampleModule,
		UiComponentsModule,
		TranslocoModule,
	],
	exports: [TranslocoModule, UiComponentsModule],
	providers: [AuthService, GlobalStorage, ConfigService],
})
export class SharedModule {}
