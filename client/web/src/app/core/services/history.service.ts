import { Injectable } from '@angular/core';
import { CustomerActivity, I_TYPE } from '../interfaces/customer.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  activityData: Array<CustomerActivity> = [];

  constructor() {}

  //sarray para abrigar activity data depois chamar o serviço

  activityDummyList(): Array<CustomerActivity> {
    return [
      {
        id: '1',
        customer: '2',
        date: '2023-04-21',
        type: I_TYPE.ICI,
        description: 'NPS Detractor',
        observation:
          'Graded out service a 5(1-10 scale) after getting feedback of new training plan',
      },
      {
        id: '2',
        customer: '2',
        date: '2021-09-21',
        type: I_TYPE.APPOINTMENT,
        description: 'New Training Plan',
        observation: '',
      },
      {
        id: '1',
        customer: '2',
        date: '2021-09-21',
        type: I_TYPE.FOOTFALL,
        description: 'Visit',
        observation: '14:34 - 15:53',
      },
      {
        id: '2',
        customer: '2',
        date: '2021-09-21',
        type: I_TYPE.OCI,
        description: 'SMS - Inactive 14 days',
        observation:
          '"Hello! We noticed you have not come to train in a few days. We know there are difficult weeks but it is essential to keep going! Do not waste your progress! We count on you!"',
      },
      {
        id: '1',
        customer: '2',
        date: '2021-09-21',
        type: I_TYPE.FOOTFALL,
        description: 'Group Class',
        observation: 'Body Pump - Thu, 09:00',
      },
      {
        id: '2',
        customer: '2',
        date: '2021-09-21',
        type: I_TYPE.FOOTFALL,
        description: 'Visit',
        observation: '08:30 - 09:58',
      },
      {
        id: '1',
        customer: '2',
        date: '2022-05-21',
        type: I_TYPE.ICI,
        description: 'NPS Detractor',
        observation:
          'Graded out service a 5(1-10 scale) after getting feedback of new training plan',
      },
      {
        id: '2',
        customer: '2',
        date: '2022-05-21',
        type: I_TYPE.APPOINTMENT,
        description: 'New Training Plan',
        observation: '',
      },
      {
        id: '1',
        customer: '2',
        date: '2021-09-21',
        type: I_TYPE.FOOTFALL,
        description: 'Visit',
        observation: '14:34 - 15:53',
      },
      {
        id: '2',
        customer: '2',
        date: '2021-09-21',
        type: I_TYPE.OCI,
        description: 'SMS - Inactive 14 days',
        observation:
          '"Hello! We noticed you have not come to train in a few days. We know there are difficult weeks but it is essential to keep going! Do not waste your progress! We count on you!"',
      },
      {
        id: '1',
        customer: '2',
        date: '2021-09-21',
        type: I_TYPE.FOOTFALL,
        description: 'Group Class',
        observation: 'Body Pump - Thu, 09:00',
      },
      {
        id: '2',
        customer: '2',
        date: '2021-09-21',
        type: I_TYPE.FOOTFALL,
        description: 'Visit',
        observation: '08:30 - 09:58',
      },
      {
        id: '1',
        customer: '2',
        date: '2020-07-16',
        type: I_TYPE.ICI,
        description: 'NPS Detractor',
        observation:
          'Graded out service a 5(1-10 scale) after getting feedback of new training plan',
      },
      {
        id: '2',
        customer: '2',
        date: '2021-09-21',
        type: I_TYPE.APPOINTMENT,
        description: 'New Training Plan',
        observation: '',
      },
      {
        id: '1',
        customer: '2',
        date: '2023-09-11',
        type: I_TYPE.FOOTFALL,
        description: 'Visit',
        observation: '14:34 - 15:53',
      },
      {
        id: '2',
        customer: '2',
        date: '2021-09-21',
        type: I_TYPE.OCI,
        description: 'SMS - Inactive 14 days',
        observation:
          '"Hello! We noticed you have not come to train in a few days. We know there are difficult weeks but it is essential to keep going! Do not waste your progress! We count on you!"',
      },
      {
        id: '1',
        customer: '2',
        date: '2021-09-21',
        type: I_TYPE.FOOTFALL,
        description: 'Group Class',
        observation: 'Body Pump - Thu, 09:00',
      },
      {
        id: '2',
        customer: '2',
        date: '2021-09-21',
        type: I_TYPE.FOOTFALL,
        description: 'Visit',
        observation: '08:30 - 09:58',
      },
      {
        id: '1',
        customer: '2',
        date: '2021-09-21',
        type: I_TYPE.ICI,
        description: 'NPS Detractor',
        observation:
          'Graded out service a 5(1-10 scale) after getting feedback of new training plan',
      },
      {
        id: '2',
        customer: '2',
        date: '2023-08-11',
        type: I_TYPE.APPOINTMENT,
        description: 'New Training Plan',
        observation: '',
      },
      {
        id: '1',
        customer: '2',
        date: '2021-09-21',
        type: I_TYPE.FOOTFALL,
        description: 'Visit',
        observation: '14:34 - 15:53',
      },
      {
        id: '2',
        customer: '2',
        date: '2023-05-01',
        type: I_TYPE.OCI,
        description: 'SMS - Inactive 14 days',
        observation:
          '"Hello! We noticed you have not come to train in a few days. We know there are difficult weeks but it is essential to keep going! Do not waste your progress! We count on you!"',
      },
      {
        id: '1',
        customer: '2',
        date: '2021-09-21',
        type: I_TYPE.FOOTFALL,
        description: 'Group Class',
        observation: 'Body Pump - Thu, 09:00',
      },
      {
        id: '2',
        customer: '2',
        date: '2021-09-21',
        type: I_TYPE.FOOTFALL,
        description: 'Visit',
        observation: '08:30 - 09:58',
      },
    ];
  }

  getActivityByCustomerId(customerId: string): Array<CustomerActivity> {
    //TODO: customer/id/history
    const history = this.activityData.filter((item) => item.id === customerId);
    return history;
  }
}
