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

    if (this.selectedFilter !== null) {
      this.info = this.orderActivityByDate(
        activities.filter((history) => history.type === this.selectedFilter)
      );
    } else {
      this.info = this.orderActivityByDate(activities);
    }
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

  isLastActivity(item: CustomerActivity): boolean {
    if (this.info.length === 0) {
      return false;
    }
    const orderedActivities = this.orderActivityByDate(this.info);
    const lastDate = new Date(orderedActivities[0].date);
    const itemDate = new Date(item.date);
    return itemDate.getTime() === lastDate.getTime();
  }

  isLastItem(item: CustomerActivity): boolean {
    return !this.selectedFilter && this.isLastActivity(item);
  }

  filterCustomerActivity(type: I_TYPE | null) {
    if (type !== null) {
      if (type === this.selectedFilter) {
        this.selectedFilter = null;
        this.loadActivity();
      } else {
        this.selectedFilter = type;
        this.info = this.activityService
          .activityDummyList()
          .filter((history) => history.type === this.selectedFilter);
        this.info = this.orderActivityByDate(this.info);
      }
    }
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
}
