import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routin.module';
import { SharedModule } from '../../../core/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule, FormsModule],
})
export class UserModule {}
