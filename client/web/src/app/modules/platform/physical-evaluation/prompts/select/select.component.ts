import { Component, Input, Output, EventEmitter } from '@angular/core';
import { every } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() prompt?: any;
  @Output() onOptionSelected = new EventEmitter<any>();
  value: any;

  constructor() {}

  onValueChange(event: any) {
    if (event) {
      this.value = event.detail.value;
      this.onOptionSelected.emit(this.value);
    } else {
      console.error('event undefined: ');
    }
  }

  isMultiSelect(): boolean {
    return this.prompt?.options.length > 2;
  }
}
