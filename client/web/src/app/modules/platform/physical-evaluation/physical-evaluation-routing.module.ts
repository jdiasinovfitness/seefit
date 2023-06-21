import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhysicalEvaluationComponent } from './physical-evaluation.component';

const routes: Routes = [
  {
    path: '',
    component: PhysicalEvaluationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysicalEvaluationRoutingModule {}
