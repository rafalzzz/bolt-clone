import { GroupBase } from 'react-select';

export type TOption = {
  value: string;
  label: string;
};

export type TGroupedOption = GroupBase<TOption> & {
  icon?: string;
  shortName?: string;
};
