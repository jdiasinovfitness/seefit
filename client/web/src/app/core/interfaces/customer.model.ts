import { I18N } from '../services/lang.service';

export interface Customer {
  id: string;
  code: string;
  photo: string;
  name: string;
  dob: string; //birthday date
  frequency: string;
  risk: string;
  interaction: InteractionBasicInfo;
  additionalInfo?: AdditionalInformation;
  currentLocation: CurrentLocation;
  healthRisk: boolean; //To be analyzed
  historyInfo?: Array<CustomerHistory>;
}

export interface InteractionBasicInfo {
  id: string;
  status: C_STATUS;
  date: string;
  description: Array<I18N>;
  callBlock: boolean;
}

export interface AdditionalInformation {
  icons: Array<string>;
}

export interface CurrentLocation {
  inClub: boolean;
  inExerciseRoom: boolean;
}

export enum C_STATUS {
  COMPLETED = 'COMPLETED',
  PLANNED = 'PLANNED',
  UNPLANNED = 'UNPLANNED',
}

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
