import { Component, Input, OnInit } from '@angular/core';
import {
  Checkbox,
  GroupData,
  Option,
  PEdata,
  PromptType,
  Prompts,
  Radio,
  Select,
  TextArea,
} from '../../../../core/interfaces/pedata.model';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {
  @Input() itemList!: Array<any>;
  @Input() pEData?: PEdata[];
  isExpanded: boolean[] = [];

  constructor() {}

  ngOnInit() {
    this.isExpanded = new Array(this.itemList.length).fill(false);
  }

  public toggleAccordion(event: any): void {
    const step: string[] = event.detail.value;
    this.isExpanded = this.isExpanded.map((_, index) =>
      step.includes('step' + index)
    );
  }

  noAnswer(): string {
    return 'Sem Resposta';
  }

  resumedAnswers(group: GroupData): { question: Prompts; answer: string }[] {
    const questionAnswer: { question: Prompts; answer: string }[] = [];

    group.prompts.forEach((prompt: Prompts) => {
      let answer = '';
      switch (prompt.type) {
        case PromptType.Radio:
          answer = this.showRadioAnswer(prompt);
          break;
        case PromptType.Select:
          answer = this.showSelectAnswer(prompt);
          break;
        case PromptType.Checkbox:
          answer = this.showCheckboxAnswer(prompt);
          break;
        case PromptType.Input:
        case PromptType.TextArea:
          answer = this.showInputorTextAnswer(prompt);
          break;
        default:
          console.log('Invalid prompt type');
      }
      questionAnswer.push({ question: prompt, answer: answer });
    });

    return questionAnswer;
  }

  showRadioAnswer(prompt: Prompts): string {
    const selectedOption = (prompt.prompt as Radio).selectedOption;
    const options = (prompt.prompt as Radio).options || [];
    const selectedOptionId =
      selectedOption instanceof Option ? selectedOption.id : selectedOption;

    if (selectedOptionId) {
      return options
        .map((option) => {
          if (selectedOptionId === option.label) {
            return option.label;
          }
          return;
        })
        .filter((label) => !!label)
        .join(', ');
    } else {
      return this.noAnswer();
    }
  }

  showSelectAnswer(prompt: Prompts) {
    const selectedOptions = (prompt.prompt as Select).selectedOption;
    const options = (prompt.prompt as Select).options || [];

    if (
      !selectedOptions ||
      (Array.isArray(selectedOptions) && selectedOptions.length === 0)
    ) {
      return this.noAnswer();
    }

    const selectedLabels = Array.isArray(selectedOptions)
      ? selectedOptions.map((option) =>
          typeof option === 'string' ? option : option.label
        )
      : [
          typeof selectedOptions === 'string'
            ? selectedOptions
            : selectedOptions?.label,
        ];

    return options
      .filter((option) => selectedLabels.includes(option.label))
      .map((option) => option.label)
      .join(', ');
  }

  showCheckboxAnswer(prompt: Prompts) {
    const selectedOptions = (prompt.prompt as Checkbox).options;
    if (selectedOptions && selectedOptions.some((option) => option.selected)) {
      return (
        selectedOptions
          ?.filter((option) => option.selected)
          .map((option) => option.label)
          .join(', ') || ''
      );
    } else {
      return this.noAnswer();
    }
  }

  showInputorTextAnswer(prompt: Prompts) {
    return (prompt.prompt as TextArea).value || this.noAnswer();
  }
}
