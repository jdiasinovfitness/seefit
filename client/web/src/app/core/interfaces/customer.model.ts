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

export interface CustomerFullInfo {
  id: string;
  dob: Date;
  objective: string;
  visits: { [key: string]: string };
  groupC: { [key: string]: string };
  pp_gc: number;
  last_appointment: Date;
  avg_stay: number;
  contact?: {
    //might not be available because of RGPD
    email: string;
    phone: string;
  };
  contract: Array<ContractInfo>;
  additional_information: AdditionalInformation;
}

export interface ContractInfo {
  date: Date;
  subscription: string;
  schedule: string;
}

export interface AdditionalInformation {
  icons: Array<string>;
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

export interface Interaction2BCompleted {
  id: string;
  observation: string;
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
