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
    this.info = this.selectedFilter
      ? this.filterActivitiesByType(activities)
      : this.orderActivitiesByDate(activities);
  }

  orderActivitiesByDate(activities: CustomerActivity[]): CustomerActivity[] {
    return activities.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  filterCustomerActivity(type: I_TYPE | null) {
    if (type !== null) {
      this.selectedFilter = this.selectedFilter === type ? null : type;
      this.loadActivity();
    }
  }
  filterActivitiesByType(activities: CustomerActivity[]): CustomerActivity[] {
    return activities.filter((history) => history.type === this.selectedFilter);
  }

  isLastActivity(item: CustomerActivity): boolean {
    const orderedActivities = this.orderActivitiesByDate(this.info);
    return (
      new Date(item.date).getTime() ===
      new Date(orderedActivities[0].date).getTime()
    );
  }

  isLastItem(item: CustomerActivity): boolean {
    return !this.selectedFilter && this.isLastActivity(item);
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
