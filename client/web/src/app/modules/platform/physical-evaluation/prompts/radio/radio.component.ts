import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Option } from 'src/app/core/interfaces/pedata.model';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
})
export class RadioComponent {
  @Input() options: Array<Option> = [];
  @Input() prompt!: any;
  @Output() onOptionSelected: EventEmitter<any> = new EventEmitter();

  ngOnChanges() {
    if ('options' in this.prompt) {
      this.options = this.prompt.options || [];
    }
  }

  optionSelected(event: any) {
    const selectedValue = event.detail.value;

    if (this.prompt.type === 'radio') {
      this.options.forEach((option) => {
        option.selected = option.label === selectedValue;
      });
      const selectedOption = this.options.find((option) => option.selected);
      this.onOptionSelected.emit(selectedOption);
    }
  }
}
