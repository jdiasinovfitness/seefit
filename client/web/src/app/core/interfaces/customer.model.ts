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
}

export interface InteractionBasicInfo {
  id: string;
  name: string;
  date: Date;
  type: string;
  description: Array<I18N>;
  observation?: string;
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

export interface CustomerActivity {
  id: string;
  customer: string;
  date: string;
  type: I_TYPE;
  description: string;
  observation: string;
}

export enum C_TYPE {
  IN_CLUB = 'In_Club',
  NPS = 'NPS',
}

export enum I_TYPE {
  ICI = 'ICI',
  APPOINTMENT = 'Appointment',
  OCI = 'Comms',
  FOOTFALL = 'Visit',
}
