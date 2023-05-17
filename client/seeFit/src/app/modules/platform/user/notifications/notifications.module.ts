import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../core/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NotificationsRoutingModule } from './notifications-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    SharedModule,
    FormsModule,
  ],
})
export class NotificationsModule {}
