import { GroupBase } from 'react-select';

export type TOption = {
  value: string;
  label: string;
};

export type TGroupedOption = {
  value: string;
  label: string;
  icon?: string;
  shortName?: string;
  options: GroupBase<TOption>[];
};
