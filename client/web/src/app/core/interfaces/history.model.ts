import { C_STATUS } from './customer.model';

export interface CustomerHistory {
  id: string;
  activity: C_TYPE;
  date: string;
  status: C_STATUS;
  title: string;
  comments: string;
  highlight?: boolean;
}

export enum C_TYPE {
  IN_CLUB = 'In_Club',
  NPS = 'NPS',
}
