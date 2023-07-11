import { Component } from '@angular/core';
import {
  Checkbox,
  PEdata,
  Prompts,
  PromptType,
  Radio,
  Select,
} from '../../../core/interfaces/pedata.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-physical-evaluation',
  templateUrl: './physical-evaluation.component.html',
  styleUrls: ['./physical-evaluation.component.scss'],
})
export class PhysicalEvaluationComponent {
  pEData?: Array<PEdata>;
  PromptType = PromptType;
  selectionIndex = 0;
  accordionStates: boolean[] = [];
  currentStep = 0;

  constructor(private dataService: DataService) {
    this.pEData = this.getDummyPEData();
  }

  getDummyPEData(): Array<PEdata> {
    const newPEData = this.dataService.getDummyPEData();
    return newPEData;
  }

  isRadio(prompt: Prompts): boolean {
    return prompt.type === PromptType.Radio;
  }

  isCheckbox(prompt: Prompts): boolean {
    return prompt.type === PromptType.Checkbox;
  }

  isSelect(prompt: Prompts): boolean {
    return prompt.type === PromptType.Select;
  }

  isTextArea(prompt: Prompts): boolean {
    return prompt.type === PromptType.TextArea;
  }

  getOptions(prompt: Prompts) {
    if (this.isRadio(prompt)) {
      return (prompt.prompt as Radio)?.options || [];
    } else if (this.isCheckbox(prompt)) {
      return (prompt.prompt as Checkbox)?.options || [];
    } else if (this.isSelect(prompt)) {
      return (prompt.prompt as Select)?.options || [];
    }
    return [];
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  getCurrentStep() {
    return this.pEData && this.pEData.length > 0 ? this.pEData[0].steps : [];
  }

  nextStep() {
    if (
      this.pEData &&
      this.pEData[0] &&
      this.currentStep < this.pEData[0].steps.length - 1
    ) {
      this.currentStep++;
    }
  }
}
