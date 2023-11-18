import { Injectable } from '@angular/core';
import { CustomerHistory } from '../interfaces/customer.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  historyData: Array<CustomerHistory> = [];

  constructor() {}

  getHistoryById(customerId: string): Array<CustomerHistory> {
    const history = this.historyData.filter((item) => item.id === customerId);
    return history;
  }
}
