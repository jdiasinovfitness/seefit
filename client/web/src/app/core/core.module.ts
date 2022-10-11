import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { GlobalStorage } from './storage/global.storage';
import { ConfigService } from './services/config.service';

@NgModule({
	declarations: [],
	imports: [CommonModule],
	providers: [AuthService, GlobalStorage, ConfigService],
})
export class CoreModule {
	static forRoot(): ModuleWithProviders<CoreModule> {
		return {
			ngModule: CoreModule,
		};
	}
}
