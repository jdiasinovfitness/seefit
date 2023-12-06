import { Injectable } from '@angular/core';
import { LangService } from './lang.service';
import { Customer, CustomerFullInfo } from '../interfaces/customer.model';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customerData: Array<CustomerFullInfo> = [];
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

  getDummyCustomerFullInfo(): Array<CustomerFullInfo> {
    return [
      {
        id: '1',
        dob: new Date('1995-11-08'),
        objective: 'Weight Loss',
        visits: {
          '2023-01-10': 'Yoga Class',
          '2023-02-15': 'Gym Session',
        },
        pp_gc: 0.75,
        last_appointment: new Date('2023-04-13'),
        avg_stay: 120,
        contact: {
          email: 'abby.cannon@email.com',
          phone: '123-456-7890',
        },
        contract: [
          {
            date: new Date('2023-03-01'),
            subscription: 'Premium',
            schedule: 'Morning',
          },
        ],
        additional_information: {
          icons: ['ic-4_2', 'ic-1_1', 'ic-3_1'],
        },
      },
      {
        id: '2',
        dob: new Date('1989-04-02'),
        objective: 'Fitness Goals',
        visits: {
          '2023-01-01': 'Cardio Session',
          '2023-01-15': 'Strength Training',
        },
        pp_gc: 0.6,
        last_appointment: new Date('2023-04-02'),
        avg_stay: 45,
        contact: {
          email: 'ismail@email.com',
          phone: '123-456-7891',
        },
        contract: [
          {
            date: new Date('2023-01-01'),
            subscription: 'Premium Membership',
            schedule: 'Weekdays: 6am - 9pm',
          },
        ],
        additional_information: {
          icons: ['ic-1_2', 'ic-3_2', 'ic-3_1'],
        },
      },
      {
        id: '3',
        dob: new Date('1997-03-30'),
        objective: 'Weight Loss',
        visits: {
          '2023-04-01': 'Gym',
          '2023-04-03': 'Yoga',
        },
        pp_gc: 0.65,
        last_appointment: new Date('2023-04-03'),
        avg_stay: 60,
        contact: {
          email: 'rupert.horton@email.com',
          phone: '555-0103',
        },
        contract: [
          {
            date: new Date('2023-01-15'),
            subscription: 'Silver Membership',
            schedule: 'Weekdays: 6am - 10pm',
          },
        ],
        additional_information: {
          icons: ['ic-1_5', 'ic-4_1', 'ic-3_1', 'ic-4_2', 'ic-4_3', 'ic-4_4'],
        },
      },
      {
        id: '4',
        dob: new Date('1987-04-09'),
        objective: 'Muscle Building',
        visits: {
          '2023-04-05': 'Weight Training',
          '2023-04-06': 'Boxing',
        },
        pp_gc: 0.55,
        last_appointment: new Date('2023-04-06'),
        avg_stay: 75,
        contact: {
          email: 'sanaa.tyler@email.com',
          phone: '555-0104',
        },
        contract: [
          {
            date: new Date('2023-02-01'),
            subscription: 'Platinum Membership',
            schedule: 'Everyday: 5am - 12am',
          },
        ],
        additional_information: {
          icons: ['ic-1_2', 'ic-3_1', 'ic-4_2'],
        },
      },
      {
        id: '5',
        dob: new Date('1961-04-05'),
        objective: 'Tonification',
        visits: {
          '2023-03-31': 'Cardio',
          '2023-04-02': 'Pilates',
        },
        pp_gc: 0.7,
        last_appointment: new Date('2023-04-02'),
        avg_stay: 50,
        contact: {
          email: 'alan.rivers@email.com',
          phone: '555-0105',
        },
        contract: [
          {
            date: new Date('2023-02-15'),
            subscription: 'Membership',
            schedule: 'Weekdays: 7am - 9pm',
          },
        ],
        additional_information: {
          icons: ['ic-3_1', 'ic-4_2', 'ic-4_3'],
        },
      },
      {
        id: '6',
        dob: new Date('1959-02-01'),
        objective: 'Flexibility',
        visits: {
          '2023-04-07': 'Dance',
          '2023-04-09': 'Stretching',
        },
        pp_gc: 0.35,
        last_appointment: new Date('2023-04-07'),
        avg_stay: 40,
        contact: {
          email: 'helena.saunders@email.com',
          phone: '555-0106',
        },
        contract: [
          {
            date: new Date('2023-03-01'),
            subscription: 'Senior Membership',
            schedule: 'Weekdays: 8am - 5pm',
          },
        ],
        additional_information: {
          icons: ['ic-1_4', 'ic-3_1', 'ic-4_1'],
        },
      },
      {
        id: '7',
        dob: new Date('1959-02-01'),
        objective: 'Flexibility',
        visits: {
          '2023-04-07': 'Dance',
          '2023-04-09': 'Stretching',
        },
        pp_gc: 0.35,
        last_appointment: new Date('2023-04-07'),
        avg_stay: 40,
        contact: {
          email: 'helena.saunders@email.com',
          phone: '555-0106',
        },
        contract: [
          {
            date: new Date('2023-03-01'),
            subscription: 'Senior Membership',
            schedule: 'Weekdays: 8am - 5pm',
          },
        ],
        additional_information: {
          icons: ['ic-1_4', 'ic-3_1', 'ic-4_1'],
        },
      },
      {
        id: '8',
        dob: new Date('1959-02-01'),
        objective: 'Flexibility',
        visits: {
          '2023-04-07': 'Dance',
          '2023-04-09': 'Stretching',
        },
        pp_gc: 0.35,
        last_appointment: new Date('2023-04-07'),
        avg_stay: 40,
        contact: {
          email: 'helena.saunders@email.com',
          phone: '555-0106',
        },
        contract: [
          {
            date: new Date('2023-03-01'),
            subscription: 'Senior Membership',
            schedule: 'Weekdays: 8am - 5pm',
          },
        ],
        additional_information: {
          icons: ['ic-1_4', 'ic-3_1', 'ic-4_1'],
        },
      },
      {
        id: '9',
        dob: new Date('1990-04-06'),
        objective: 'Flexibility',
        visits: {
          '2023-04-07': 'Dance',
          '2023-04-09': 'Stretching',
        },
        pp_gc: 1,
        last_appointment: new Date('2023-04-02'),
        avg_stay: 40,
        contact: {
          email: 'lori.cabrera@email.com',
          phone: '12234-0106',
        },
        contract: [
          {
            date: new Date('2023-03-01'),
            subscription: 'Senior Membership',
            schedule: 'Weekdays: 8am - 5pm',
          },
        ],
        additional_information: {
          icons: ['ic-3_2', 'ic-1_5', 'ic-3_3'],
        },
      },
      {
        id: '10',
        dob: new Date('1990-04-06'),
        objective: 'Muscles',
        visits: {
          '2023-04-07': 'Dance',
          '2023-04-09': 'Stretching',
        },
        pp_gc: 1,
        last_appointment: new Date('2023-04-02'),
        avg_stay: 40,
        contact: {
          email: 'jana.miller@email.com',
          phone: '12234-0106',
        },
        contract: [
          {
            date: new Date('2023-03-01'),
            subscription: 'Membership',
            schedule: 'Weekdays: 8am - 5pm',
          },
        ],
        additional_information: {
          icons: ['ic-1_2', 'ic-2_1', 'ic-3_1'],
        },
      },
    ];
  }

  listCustomerInfoById(customerId: string): CustomerFullInfo | undefined {
    return this.getDummyCustomerFullInfo().find(
      (item) => item.id === customerId
    );
  }

  //TODO: Replace this codeblock by Middleware HTTP Request
  // getCustomerById(id: string): Observable<Customer> {
  //   const url = `${this.path}/customer/${id}`;
  //   return this.http.get<Customer>(url);
  // }
}
