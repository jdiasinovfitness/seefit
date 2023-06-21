import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() prompt?: any;
  value: string = '';

  constructor() {}

  onValueChange() {
    console.log('Value changed:', this.value);
  }
}
