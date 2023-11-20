import { Injectable } from '@angular/core';
import { CustomerActivity, I_TYPE } from '../interfaces/customer.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  activityData: Array<CustomerActivity> = [];

  constructor() {}

  //array para abrigar activity data depois chamar o serviço

  activityDummyList(): Array<CustomerActivity> {
    return [
      {
        id: '1',
        customer: '',
        date: '2021-09-21',
        type: I_TYPE.APPOINTMENT,
        description: 'Interaction',
        observation: '',
      },
      {
        id: '1',
        customer: '',
        date: '2021-09-21',
        type: I_TYPE.APPOINTMENT,
        description: 'Interaction',
        observation: '',
      },
    ];
  }

  getActivityByCustomerId(customerId: string): Array<CustomerActivity> {
    //TODO: customer/id/history
    const history = this.activityData.filter((item) => item.id === customerId);
    return history;
  }
}
