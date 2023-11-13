import { Injectable } from '@angular/core';
import { C_TYPE, CustomerHistory } from '../interfaces/history.model';
import { C_STATUS } from '../interfaces/customer.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private historyData: CustomerHistory[] = [
    {
      id: '1',
      activity: C_TYPE.IN_CLUB,
      date: '', // replace with ISO string Date
      status: C_STATUS.PLANNED,
      title: '',
      comments: '',
    },
    {
      id: '2',
      activity: C_TYPE.IN_CLUB,
      date: '', // replace with ISO string Date
      status: C_STATUS.COMPLETED,
      title: '',
      comments: '',
    },
    {
      id: '3',
      activity: C_TYPE.IN_CLUB,
      date: '', // replace with ISO string Date
      status: C_STATUS.PLANNED,
      title: '',
      comments: '',
    },
    {
      id: '4',
      activity: C_TYPE.IN_CLUB,
      date: '', // replace with ISO string Date
      status: C_STATUS.PLANNED,
      title: '',
      comments: '',
    },
    {
      id: '5',
      activity: C_TYPE.IN_CLUB,
      date: '', // replace with ISO string Date
      status: C_STATUS.PLANNED,
      title: '',
      comments: '',
    },
    {
      id: '6',
      activity: C_TYPE.IN_CLUB,
      date: '', // replace with ISO string Date
      status: C_STATUS.PLANNED,
      title: '',
      comments: '',
    },
    {
      id: '7',
      activity: C_TYPE.NPS,
      date: '', // replace with ISO string Date
      status: C_STATUS.COMPLETED,
      title: '',
      comments: '',
    },
    {
      id: '8',
      activity: C_TYPE.NPS,
      date: '', // replace with ISO string Date
      status: C_STATUS.PLANNED,
      title: '',
      comments: '',
    },
    {
      id: '9',
      activity: C_TYPE.IN_CLUB,
      date: '', // replace with ISO string Date
      status: C_STATUS.PLANNED,
      title: '',
      comments: '',
    },
    {
      id: '10',
      activity: C_TYPE.IN_CLUB,
      date: '', // replace with ISO string Date
      status: C_STATUS.PLANNED,
      title: '',
      comments: '',
    },
  ];
  constructor() {}

  getHistoryById(customerId: string): Array<CustomerHistory> {
    const history = this.historyData.filter((item) => item.id === customerId);
    return history;
  }
}
