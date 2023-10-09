import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../core/shared/shared.module';
import { CustomerRoutingModule } from './customer-routin.module';
import { FormsModule } from '@angular/forms';
import { CustomerComponent } from './customer.component';



@NgModule({
  declarations: [
    CustomerComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class CustomerModule { }
