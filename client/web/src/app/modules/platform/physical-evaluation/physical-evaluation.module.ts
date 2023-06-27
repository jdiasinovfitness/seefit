import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhysicalEvaluationComponent } from './physical-evaluation.component';
import { PhysicalEvaluationRoutingModule } from './physical-evaluation-routing.module';
import { SharedModule } from '../../../core/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CheckboxComponent } from './prompts/checkbox/checkbox.component';
import { RadioComponent } from './prompts/radio/radio.component';
import { SelectComponent } from './prompts/select/select.component';
import { QuestionComponent } from './prompts/question/question.component';
import { TextAreaComponent } from './prompts/text-area/text-area.component';
import { InputComponent } from './prompts/input/input.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    PhysicalEvaluationComponent,
    CheckboxComponent,
    RadioComponent,
    SelectComponent,
    QuestionComponent,
    TextAreaComponent,
    InputComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    PhysicalEvaluationRoutingModule,
    SharedModule,
    FormsModule,
    IonicModule,
  ],
  exports: [PhysicalEvaluationComponent, IonicModule],
})
export class PhysicalEvaluationModule { }
