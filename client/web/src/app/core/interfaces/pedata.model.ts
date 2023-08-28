export interface PEdata {
  id: string;
  steps: Array<StepData>;
}

export interface StepData {
  number: string;
  title: string;
  icon?: string;
  isStepPassed?: boolean;
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
  selectedOption?: Option;
}

export interface Checkbox {
  options?: Array<Option>;
  selectedOption?: Array<Option>;
}

export interface Select {
  options?: Array<Option>;
  placeholder: string;
  selectedOption?: Option;
}

export interface Input {
  label: string;
  placeholder: string;
  value?: string;
}

export interface TextArea {
  label: string;
  placeholder: string;
  value?: string;
}

export interface Option {
  id: string;
  label: string;
  selected?: boolean;
}

export enum PromptType {
  Radio = 'Radio',
  Checkbox = 'Checkbox',
  Select = 'Select',
  Input = 'Input',
  TextArea = 'TextArea',
}
