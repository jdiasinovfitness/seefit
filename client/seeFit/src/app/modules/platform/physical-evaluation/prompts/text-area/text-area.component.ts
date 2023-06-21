import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent {
  @Input() prompt: any;
  @Output() textEntered = new EventEmitter<string>();

  textValue = '';

  onTextEntered() {
    this.textEntered.emit(this.textValue);
  }
}
