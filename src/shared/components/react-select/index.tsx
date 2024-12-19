import Select, { GroupBase, GroupHeadingProps, OptionProps } from 'react-select';

import { TGroupedOption } from '@/shared/types/react-select';

import './react-select.css';

export type TReactSelectProps = {
  label: string;
  options: GroupBase<TGroupedOption>[];
  placeholder?: string;
  formatGroupLabel?: (props: GroupHeadingProps<TGroupedOption, false>) => JSX.Element;
  formatOption?: (props: OptionProps<TGroupedOption, false>) => JSX.Element;
};

const ReactSelect: React.FC<TReactSelectProps> = ({
  label,
  options,
  placeholder,
  formatGroupLabel,
  formatOption,
}) => (
  <label className='text-sm font-bold text-gray-700 tracking-wide dark:text-white transition border-none outline-none'>
    {label}
    <Select
      className='react-select-container block w-full rounded-lg border-none outline-none'
      classNamePrefix='react-select'
      options={options}
      components={{ GroupHeading: formatGroupLabel, Option: formatOption }}
      placeholder={placeholder}
    />
  </label>
);

export default ReactSelect;
