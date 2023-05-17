import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICIData, ICI_STATUS } from '../../../../core/interfaces/icidata.model';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent {
  statusTypes = ICI_STATUS;

  @Input() info!: ICIData; // TODO: set correct model type after API available
  @Output() handleClick = new EventEmitter();

  constructor() {}

  onButtonClick(event: any) {
    this.handleClick.emit(event);
  }
}
