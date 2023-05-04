import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhysicalEvaluationComponent } from './physical-evaluation.component';
import { PhysicalEvaluationRoutingModule } from './physical-evaluation-routing.module';
import { SharedModule } from '../../../core/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PhysicalEvaluationComponent],
  imports: [
    CommonModule,
    PhysicalEvaluationRoutingModule,
    SharedModule,
    FormsModule,
  ],
  exports: [PhysicalEvaluationComponent],
})
export class PhysicalEvaluationModule {}
