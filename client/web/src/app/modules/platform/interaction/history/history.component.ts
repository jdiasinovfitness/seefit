import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INTERACTION_STATUS } from 'src/app/core/constants/status.constants';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  statusTypes = INTERACTION_STATUS;

  @Input() info!: any; // TODO: set correct model type after API available
  @Output() handleClick = new EventEmitter();

  constructor() {}

  onButtonClick(event: any) {
    this.handleClick.emit(event);
  }
}
