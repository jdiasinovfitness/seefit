import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { GlobalStorage } from './storage/global.storage';
import { ConfigService } from './services/config.service';
import { MaterialExampleModule } from '../material.module';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
	declarations: [InputComponent, ButtonComponent],
	imports: [CommonModule, MaterialExampleModule],
	exports: [InputComponent, ButtonComponent],
	providers: [AuthService, GlobalStorage, ConfigService],
})
export class CoreModule {}
