import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityRoutingModule } from './activity-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../core/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ActivityRoutingModule, SharedModule, FormsModule],
})
export class ActivityModule {}
