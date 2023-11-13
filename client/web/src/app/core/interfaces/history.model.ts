import { C_STATUS } from './customer.model';

export interface CustomerHistory {
  id: string;
  date: string;
  status: C_STATUS;
  title: string;
  description: string;
}
