import { Component, EventEmitter, Output } from '@angular/core';
import {
  CustomerActivity,
  I_TYPE,
} from 'src/app/core/interfaces/customer.model';
import { HistoryService } from 'src/app/core/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  activityTypes = I_TYPE;
  noComments = 'No comments to display';
  info: Array<CustomerActivity> = []; // TODO: set correct model type after API available
  @Output() handleClick = new EventEmitter();

  constructor(private activityService: HistoryService) {}

  ngOnInit() {
    this.loadActivity();
  }

  onButtonClick(event: any) {
    this.handleClick.emit(event);
  }

  loadActivity() {
    this.info = this.activityService.activityDummyList();
    console.log(this.info, 'INFO: ');
  }

  activityIcons: { [key: string]: string } = {
    Visit: 'calendar-clear-outline',
    ICI: 'people-circle-outline',
    Appointment: 'location-sharp',
    Comms: 'star',
  };

  getIconByType(type: string): string {
    return this.activityIcons[type] || '';
  }

  filterCustomerActivity(type: I_TYPE | null) {
    if (type !== null) {
      this.info = this.info.filter((history) => history.type === type);
    } else {
      this.loadActivity();
    }
  }
}
