import { SingleValue } from 'react-select';

export type TOption = {
  value: string;
  label: string;
};

export type TGroupedOption = {
  label: string;
  icon?: string;
  shortName?: string;
  options: TOption[];
};

export type TNewValue = SingleValue<TGroupedOption>;
