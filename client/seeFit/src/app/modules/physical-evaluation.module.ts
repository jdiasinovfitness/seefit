import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhysicalEvaluationComponent } from './platform/components/physical-evaluation/physical-evaluation.component';

@NgModule({
  declarations: [PhysicalEvaluationComponent],
  imports: [CommonModule],
  exports: [PhysicalEvaluationComponent],
})
export class PhysicalEvaluationModule {}
