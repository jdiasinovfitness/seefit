import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteractionComponent } from './interaction.component';
import { InteractionRoutingModule } from './interaction-routing.module';
import { UiComponentsModule } from '@i9r/ui-components';
import { SharedModule } from 'src/app/core/shared.module';

@NgModule({
	declarations: [InteractionComponent],
	imports: [
		CommonModule,
		InteractionRoutingModule,
		UiComponentsModule,
		SharedModule,
	],
})
export class InteractionModule {}
