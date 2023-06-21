import { Component, Input } from '@angular/core';
import { Option } from 'src/app/core/interfaces/pedata.model';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
})
export class RadioComponent {
  @Input() options!: Array<Option>;
  @Input() prompt!: any;

  optionSelected(event: any) {
    console.log(event.detail.value);
  }
}
