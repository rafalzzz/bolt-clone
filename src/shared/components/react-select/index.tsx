import Select, { GroupBase, GroupHeadingProps, OptionProps } from 'react-select';

import { TGroupedOption } from '@/shared/types/react-select';

import './react-select.scss';

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
  <label className='react-select'>
    {label}
    <Select
      className='react-select__container'
      classNamePrefix='react-select'
      options={options}
      components={{ GroupHeading: formatGroupLabel, Option: formatOption }}
      placeholder={placeholder}
    />
  </label>
);

export default ReactSelect;
