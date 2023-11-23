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
  selectedFilter: I_TYPE | null = null;
  @Output() handleClick = new EventEmitter();

  constructor(private activityService: HistoryService) {}

  ngOnInit() {
    this.loadActivity();
  }

  onButtonClick(event: any) {
    this.handleClick.emit(event);
  }

  loadActivity() {
    const activities = this.activityService.activityDummyList();
    this.info = this.orderActivityByDate(activities);
  }

  isLastActivity(activity: CustomerActivity): boolean {
    const activityDate = new Date(activity.date);

    const orderedActivities = this.orderActivityByDate(this.info);

    const lastDate = new Date(
      orderedActivities[orderedActivities.length - 1].date
    );
    return lastDate.getTime() === activityDate.getTime();
  }

  orderActivityByDate(
    activity: Array<CustomerActivity>
  ): Array<CustomerActivity> {
    return activity.sort((a, b) => {
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);
      return date2.getTime() - date1.getTime();
    });
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
      if (type === this.selectedFilter) {
        this.selectedFilter = null;
      } else {
        this.selectedFilter = type;
      }

      if (this.selectedFilter !== null) {
        this.info = this.activityService
          .activityDummyList()
          .filter((history) => history.type === this.selectedFilter);
      } else {
        this.info = this.activityService.activityDummyList();
      }
    }
  }
}
