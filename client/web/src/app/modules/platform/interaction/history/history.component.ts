import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICIData, ICI_STATUS } from '../../../../core/interfaces/icidata.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  statusTypes = ICI_STATUS;

  @Input() info!: ICIData; // TODO: set correct model type after API available
  @Output() handleClick = new EventEmitter();

  constructor() {}

  onButtonClick(event: any) {
    this.handleClick.emit(event);
  }
}
