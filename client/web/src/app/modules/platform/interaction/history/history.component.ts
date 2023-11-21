import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  noComments = '<i>No comments to display</i>';
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
    Visits: 'calendar-clear',
    Interact: 'people-circle',
    Appoint: 'location',
    Comms: 'star',
  };

  getIconByType(type: string): string {
    return this.activityIcons[type] || '';
  }

  filterCustomerActivity(type: I_TYPE) {
    if (type) {
      this.loadActivity();
    } else {
      this.info = this.info.filter((history) => history.type === type);
    }
  }
}
