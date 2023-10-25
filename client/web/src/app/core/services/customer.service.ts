import { Injectable } from '@angular/core';
import { LangService } from './lang.service';
import { Customer } from '../interfaces/customer.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    private langService: LangService,
    private dataService: DataService
  ) {}
  /**
   * fuction that returns a list of customers
   * @param location
   * @param origin
   * @returns
   */
  listCustomers(location?: string, origin?: string): Promise<Array<Customer>> {
    //TODO: Replace this codeblock by Middleware HTTP Request
    return new Promise((resolve, reject) => {
      const dummyCustomerData: Array<Customer> =
        this.dataService.getLiveClubDummyList();
      resolve(dummyCustomerData);
    });
  }
}
