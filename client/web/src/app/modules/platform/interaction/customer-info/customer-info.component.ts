import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICIIcons } from '../../../../core/interfaces/icidata.model';
import { DataService } from 'src/app/core/services/data.service';
import {
  C_STATUS,
  Customer,
  CustomerFullInfo,
} from 'src/app/core/interfaces/customer.model';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent implements OnInit {
  statusTypes = C_STATUS;
  icons: Array<ICIIcons> = [];
  customerFullInfo: CustomerFullInfo | undefined;

  @Input() info!: Customer; // TODO: set correct model type after API available
  @Output() handleClick = new EventEmitter();

  constructor(
    private dataService: DataService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.icons = this.dataService.icons;
    if (this.info !== undefined) {
      this.customerFullInfo = this.customerService.listCustomerInfoById(
        this.info.id
      );
    }
  }

  isIconEnabled(icon: ICIIcons): boolean {
    if (this.info.additionalInfo?.icons) {
      return this.info.additionalInfo?.icons.includes(icon.id);
    }
    return false;
  }

  calculateAge(dob: Date): number {
    const birthDate = new Date(dob);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  calculateLastAppointment(lastAppointment: Date): number {
    const lastAppointmentDate = new Date(lastAppointment);
    const today = new Date();
    return Math.floor(
      (today.getTime() - lastAppointmentDate.getTime()) / (1000 * 3600 * 24)
    );
  }

  calculateMembership(contractDate: Date): number {
    const contractStartDate = new Date(contractDate);
    const today = new Date();
    return (
      (today.getFullYear() - contractStartDate.getFullYear()) * 12 +
      today.getMonth() -
      contractStartDate.getMonth()
    );
  }

  onButtonClick(event: any) {
    this.handleClick.emit(event);
  }
}
