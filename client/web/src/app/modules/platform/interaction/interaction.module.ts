import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteractionComponent } from './interaction.component';
import { InteractionRoutingModule } from './interaction-routing.module';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { InteractionInfoComponent } from './interaction-info/interaction-info.component';
import { HistoryComponent } from './history/history.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { ObservationComponent } from './observation/observation.component';
import { IciListHeaderComponent } from './ici-list-header/ici-list-header.component';
import { SharedModule } from '../../../core/shared.module';

@NgModule({
  declarations: [
    InteractionComponent,
    CustomerInfoComponent,
    InteractionInfoComponent,
    HistoryComponent,
    EmptyStateComponent,
    ObservationComponent,
    IciListHeaderComponent,
  ],
  imports: [CommonModule, InteractionRoutingModule, SharedModule],
})
export class InteractionModule {}
