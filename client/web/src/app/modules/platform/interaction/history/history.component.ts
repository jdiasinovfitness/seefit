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
  selectedFilters: Array<I_TYPE> = [];
  @Output() handleClick = new EventEmitter();

  constructor(private activityService: HistoryService) {}

  ngOnInit() {
    this.loadActivity();
    this.selectedFilters = [
      this.activityTypes.FOOTFALL,
      this.activityTypes.ICI,
      this.activityTypes.APPOINTMENT,
      this.activityTypes.OCI,
    ];
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

  isFilterActive(type: I_TYPE): boolean {
    return this.selectedFilters.includes(type);
  }

  filterCustomerActivity(type: I_TYPE | null) {
    if (type !== null) {
      const index = this.selectedFilters.indexOf(type);

      if (index !== -1) {
        this.selectedFilters.splice(index, 1);
      } else {
        this.selectedFilters.push(type);
      }

      if (this.selectedFilters.length > 0) {
        this.info = this.activityService
          .activityDummyList()
          .filter((history) => this.selectedFilters.includes(history.type));
      } else {
        this.info = this.activityService.activityDummyList();
      }
    }
  }
}
