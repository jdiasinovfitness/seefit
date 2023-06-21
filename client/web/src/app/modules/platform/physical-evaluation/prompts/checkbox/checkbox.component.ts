import { Component, Input } from '@angular/core';
import { Option } from 'src/app/core/interfaces/pedata.model';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent {
  @Input() options!: Array<Option>;
  @Input() prompt!: any;

  optionSelected(event: any) {
    console.log(event.detail.value);
  }
}
