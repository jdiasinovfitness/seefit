import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INTERACTION_STATUS } from '../../../../core/constants/status.constants';
import { ICIData } from '../../../../core/interfaces/icidata.model';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent {
  statusTypes = INTERACTION_STATUS;

  @Input() info!: ICIData; // TODO: set correct model type after API available
  @Output() handleClick = new EventEmitter();

  constructor() {}

  onButtonClick(event: any) {
    this.handleClick.emit(event);
  }
}
