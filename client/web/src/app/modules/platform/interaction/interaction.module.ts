import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteractionComponent } from './interaction.component';
import { InteractionRoutingModule } from './interaction-routing.module';
import { SharedModule } from 'src/app/core/shared.module';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { InteractionInfoComponent } from './interaction-info/interaction-info.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
	declarations: [
		InteractionComponent,
		CustomerInfoComponent,
		InteractionInfoComponent,
		HistoryComponent,
	],
	imports: [CommonModule, InteractionRoutingModule, SharedModule],
})
export class InteractionModule {}
