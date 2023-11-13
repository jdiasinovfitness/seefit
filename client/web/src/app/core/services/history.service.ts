import { Injectable } from '@angular/core';
import { CustomerHistory } from '../interfaces/history.model';
import { C_STATUS } from '../interfaces/customer.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private historyData: CustomerHistory[] = [
    {
      id: '',
      date: '',
      status: C_STATUS.PLANNED,
      title: '',
      description: '',
    },
  ];
  constructor() {}

  async loadHistory() {}
}
