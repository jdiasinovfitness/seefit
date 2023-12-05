import { Injectable } from '@angular/core';
import { LangService } from './lang.service';
import { Customer, CustomerInfo } from '../interfaces/customer.model';
import { DataService } from './data.service';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customerData: Array<CustomerInfo> = [];
  path: any; // url to api
  constructor(
    private langService: LangService,
    private dataService: DataService,
    private http: HttpClient
  ) {}
  /**
   * fuction that returns a list of customers
   * @param location
   * @param origin
   * @returns
   */

  listCustomers(location?: string, origin?: string): Promise<Array<Customer>> {
    return new Promise((resolve, reject) => {
      const dummyCustomerData: Array<Customer> =
        this.dataService.getLiveClubDummyList();
      resolve(dummyCustomerData);
    });
  }

  listCustomerInfo(): Array<CustomerInfo> {
    this.customerData = this.dataService.getDummyCustomerFullInfo();
    return this.customerData;
  }

  //TODO: Replace this codeblock by Middleware HTTP Request
  getCustomerById(id: string): Observable<Customer> {
    const url = `${this.path}/customer/${id}`;
    return this.http.get<Customer>(url);
  }
}
