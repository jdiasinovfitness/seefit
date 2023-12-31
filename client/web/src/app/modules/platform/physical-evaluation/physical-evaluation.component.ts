import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import {
  Checkbox,
  PEdata,
  Prompts,
  PromptType,
  Radio,
  Select,
  StepData,
  Option,
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
  currentStep = 0;
  selectionIndex = 0;
  completedSteps: boolean[] = [];
  nextStepClicked = false;
  nextClickedSteps: boolean[] = [];
  showPe = false;
  resumeScreen = 0;
  resumeSelected = false;

  @ViewChild('content', { static: false }) content!: IonContent;

  constructor(private dataService: DataService) {
    this.pEData = this.getDummyPEData();
    this.completedSteps = new Array(this.pEData[0].steps.length).fill(false);
    this.nextClickedSteps = new Array(this.pEData[0].steps.length).fill(false);
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

  getOptions(prompt: Prompts): Option[] {
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
    if (this.showPe) {
      this.currentStep = this.resumeScreen;
      this.showPe = false;
    } else {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    }
    this.resumeSelected = false;
    this.content.scrollToTop(200);
  }

  getCurrentStep(): StepData[] {
    return this.pEData && this.pEData.length > 0 ? this.pEData[0].steps : [];
  }

  isAnswered(prompt: Prompts): boolean {
    let isAnswered = false;

    switch (prompt.type) {
      case PromptType.Select:
        if ('selectedOption' in prompt.prompt) {
          isAnswered = !!prompt.prompt.selectedOption;
        }
        break;
      case PromptType.Checkbox:
        if ('options' in prompt.prompt) {
          isAnswered =
            (prompt.prompt as Checkbox).options?.some(
              (option) => option.selected
            ) ?? false;
        }
        break;
      case PromptType.Radio:
        if ('selectedOption' in prompt.prompt) {
          isAnswered = !!prompt.prompt.selectedOption;
        }
        break;
      case PromptType.Input:
      case PromptType.TextArea:
        break;
      default:
        console.error(`Unknown prompt type: ${prompt.type}`);
    }

    return isAnswered;
  }

  handleOptionSelected(
    option: Option | Option[],
    groupIndex: number,
    promptIndex: number
  ) {
    if (this.pEData && this.pEData.length > 0) {
      const currentStep = this.pEData[0].steps[this.currentStep];
      if (currentStep?.group[groupIndex]) {
        const currentGroup = currentStep.group[groupIndex];
        if (currentGroup.prompts[promptIndex]) {
          const currentPrompt = currentGroup.prompts[promptIndex];
          if (
            currentPrompt.type === PromptType.Radio ||
            currentPrompt.type === PromptType.Select
          ) {
            (currentPrompt.prompt as Radio | Select).selectedOption =
              option as Option;
          } else if (currentPrompt.type === PromptType.Checkbox) {
            (currentPrompt.prompt as Checkbox).selectedOption =
              option as Option[];
          }
        }
      }
    }
  }

  allQuestionsAnswered(): boolean {
    if (!this.pEData || this.pEData.length === 0) {
      return false;
    }
    for (const pData of this.pEData) {
      for (const step of pData.steps) {
        for (const group of step.group) {
          for (const prompt of group.prompts) {
            if (!this.isAnswered(prompt)) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  nextStep() {
    if (
      this.pEData &&
      this.pEData[0] &&
      this.isRequiredAnswered(this.currentStep)
    ) {
      if (this.currentStep < this.pEData[0].steps.length - 1) {
        this.nextClickedSteps[this.currentStep] = true;
        this.completedSteps[this.currentStep] = true;
        this.currentStep++;
        this.nextStepClicked = true;
        if (!this.showPe) {
          this.resumeScreen = this.currentStep;
        }
      } else {
        this.completedSteps[this.currentStep] = true;
        this.showPe = true;
        this.resumeSelected = true;
      }
      window.scrollTo(0, 0);
    }
    this.content.scrollToTop(200);
  }

  isStepComplete(index: number): boolean {
    if (this.pEData && this.pEData.length > 0) {
      if (index === this.pEData[0].steps.length - 1) {
        if (this.resumeSelected || this.completedSteps[index]) {
          return true;
        }
      }
      if (this.nextClickedSteps[index]) {
        return this.isRequiredAnswered(index);
      }
    }
    if (this.resumeSelected || this.showPe) {
      return true;
    }

    return false;
  }

  isStepCompleted(index: number): boolean {
    return index < this.currentStep && this.isStepComplete(index);
  }

  updateCompletedSteps() {
    if (this.pEData) {
      this.completedSteps = this.pEData[0].steps.map((_, index) =>
        this.isStepComplete(index)
      );
    }
  }

  isRequired(prompt: Prompts): boolean {
    const requiredValidation = prompt.validations.find(
      (validation) => validation.name == 'required'
    );
    return requiredValidation && requiredValidation.value;
  }
  isRequiredAnswered(index: number): boolean {
    if (this.pEData && this.pEData.length > 0) {
      const prompts = this.pEData[0].steps[index].group.reduce<Prompts[]>(
        (acc, group) => [...acc, ...group.prompts],
        []
      );
      const requiredPrompts = prompts.filter((prompt) => {
        const requiredValidation = prompt.validations.find(
          (validation) => validation.name == 'required'
        );
        return requiredValidation && requiredValidation.value;
      });
      return requiredPrompts.every((prompt) => this.isAnswered(prompt));
    }
    return false;
  }

  finalize() {
    this.completedSteps.fill(true);
  }
}
