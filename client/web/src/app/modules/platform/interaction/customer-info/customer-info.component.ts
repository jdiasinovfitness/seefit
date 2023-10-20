import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ICIData,
  ICI_STATUS,
  ICIIcons,
} from '../../../../core/interfaces/icidata.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent {
  statusTypes = ICI_STATUS;
  icons: Array<ICIIcons> = [];

  @Input() info!: ICIData; // TODO: set correct model type after API available
  @Output() handleClick = new EventEmitter();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.icons = this.dataService.icons;
  }
  isIconEnabled(icon: any): boolean {
    if (
      this.info &&
      this.info.customerInfo &&
      this.info.customerInfo.additionalInfo &&
      this.info.customerInfo.additionalInfo.icons
    ) {
      return this.info.customerInfo.additionalInfo.icons.includes(icon.id);
    }
    return false;
  }

  onButtonClick(event: any) {
    this.handleClick.emit(event);
  }
}
