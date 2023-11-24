import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ICIData,
  ICI_STATUS,
  ICIIcons,
} from '../../../../core/interfaces/icidata.model';
import { DataService } from 'src/app/core/services/data.service';
import { Customer } from 'src/app/core/interfaces/customer.model';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent {
  statusTypes = ICI_STATUS;
  icons: Array<ICIIcons> = [];

  @Input() info!: Customer; // TODO: set correct model type after API available
  @Output() handleClick = new EventEmitter();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.icons = this.dataService.icons;
  }
  isIconEnabled(icon: ICIIcons): boolean {
    if (this.info.additionalInfo?.icons) {
      return this.info.additionalInfo?.icons.includes(icon.id);
    }
    return false;
  }

  onButtonClick(event: any) {
    this.handleClick.emit(event);
  }
}
