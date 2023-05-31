export interface ICIData {
  title: string;
  userId: string;
  status: ICI_STATUS;
  date: string;
  interaction: ICILabel;
  primary: ICILabel;
  secondary: ICILabel;
  imageUrl: string;
  customerInfo: ICIConsumerInfo;
  interactionInfo: string;
  historyInfo: Array<ICIHistoryInfo>;
  inClub: boolean;
  excludeAG: boolean;
}

export enum ICI_STATUS {
  COMPLETED = 'COMPLETED',
  PLANNED = 'PLANNED',
  UNPLANNED = 'UNPLANNED',
}
export enum ICI_TYPE {
  IN_CLUB = 'In-Club',
  NPS = 'NPS',
  SMS = 'SMS',
}

export interface ICILabel {
  label: string;
  value: string;
  color: string;
  isBold?: boolean;
}

export interface ICIHistoryInfo {
  id: string;
  date: string;
  status: ICI_STATUS;
  type: ICI_TYPE;
  title: string;
  highlight?: boolean;
  description: string;
}

export interface ICIConsumerInfo {
  customerRecord: ICICustomerRecord;
  contractType: ICICustomerRecord;
  additionalInfo: ICIAdditionalInfo;
  observation: string;
}
export interface ICICustomerRecord {
  title: string;
  content: Array<ICIKeyVal>;
}

export interface ICIAdditionalInfo {
  title: string;
  lifeCycle: ICILifecycle;
  icons: Array<ICIIcons>;
}

export interface ICIIcons {
  icon: string;
  isDisabled: boolean;
}
export interface ICILifecycle {
  key: string;
  progress: number;
  topLabels: Array<any>;
  bottomLabels: Array<any>;
}
export interface ICIKeyVal {
  key: string;
  value: string;
}

export interface ICIFilter {
  search: string;
  inClub: boolean;
  excludeAG: boolean;
  expired: boolean;
}
