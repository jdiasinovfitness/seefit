import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Option } from 'src/app/core/interfaces/pedata.model';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent {
  @Input() options: Option[] = [];
  @Input() prompt!: any;
  @Output() onOptionsChange: EventEmitter<Option[]> = new EventEmitter();

  ngOnChanges() {
    if ('options' in this.prompt) {
      this.options = this.prompt.options || [];
    }
  }

  optionSelected(option: Option) {
    if (this.prompt.type === 'checkbox') {
      const selectedOptions = this.options.filter((opt) => opt.selected);
      this.onOptionsChange.emit(selectedOptions);
    }
  }
}
