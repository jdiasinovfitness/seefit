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
  status: C_STATUS;
  date: string;
  name: Array<I18N>;
  callBlock: boolean;
}
export interface InteractionInfo {
  id: string;
  name: string;
  date: Date;
  type: string;
  description: Array<I18N>;
  observation: string;
  status: C_STATUS;
}
export interface InteractionTypes {
  id: string;
  name: Array<I18N>;
  interactions: Array<InteractionInfo>;
}
export interface InteractionCreation {
  id: string;
  name: string;
  date: Date;
  type: C_STATUS;
  description: Array<I18N>;
  observation: string;
}

export interface AdditionalInformation {
  icons: Array<string>;
}

export interface CurrentLocation {
  inClub: boolean;
  inExerciseRoom: boolean;
}

export interface CustomerActivity {
  id: string;
  customer: string;
  date: string;
  type: I_TYPE;
  description: string;
  observation: string;
}

export enum C_STATUS {
  COMPLETED = 'COMPLETED',
  PLANNED = 'PLANNED',
  UNPLANNED = 'UNPLANNED',
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
