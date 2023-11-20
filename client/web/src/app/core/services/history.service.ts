import { Injectable } from '@angular/core';
import { CustomerActivity } from '../interfaces/customer.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  activityData: Array<CustomerActivity> = [];

  constructor() {}

  getActivityByCustomerId(customerId: string): Array<CustomerActivity> {
    //TODO: customer/id/history
    const history = this.activityData.filter((item) => item.id === customerId);
    console.log(this.activityData, 'History Data');
    return history;
  }
}
