import { Component, Input } from '@angular/core';
import { Prompts, PromptType } from 'src/app/core/interfaces/pedata.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
})
export class QuestionComponent {
  @Input() question?: Prompts;

  PromptType = PromptType;

  getComponent(): string {
    switch (this.question?.type) {
      case PromptType.Checkbox:
        return 'app-checkbox';
      case PromptType.Radio:
        return 'app-radio';
      case PromptType.Select:
        return 'app-select';
      case PromptType.TextArea:
        return '';
      default:
        return '';
    }
  }
}
