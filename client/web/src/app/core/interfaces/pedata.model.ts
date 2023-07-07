export interface PEdata {
  id: string;
  steps: Array<StepData>;
}

export interface StepData {
  number: string;
  title: string;
  icon?: string;
  group: Array<GroupData>;
}

export interface GroupData {
  title: string;
  prompts: Array<Prompts>;
}

export interface Prompts {
  title: string;
  type: PromptType;
  validations: Array<Validation>;
  prompt: Radio | Checkbox | Select | Input | TextArea;
}
export interface Validation {
  name: string;
  value: any;
}

export interface Radio {
  options?: Array<Option>;
}
export interface Checkbox {
  options?: Array<Option>;
}
export interface Select {
  options?: Array<Option>;
  placeholder: string;
}
export interface Input {
  label: string;
  placeholder: string;
}
export interface TextArea {
  label: string;
  placeholder: string;
}
export interface Option {
  id: string;
  label: string;
  selected?: boolean;
}

export enum PromptType {
  Radio,
  Checkbox,
  Select,
  Input,
  TextArea,
}
