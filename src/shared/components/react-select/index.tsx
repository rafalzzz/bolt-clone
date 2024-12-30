import Select, { GroupBase, GroupHeadingProps, OptionProps, SingleValueProps } from 'react-select';

import { TGroupedOption } from '@/shared/types/react-select';

import './react-select.scss';

export type TReactSelectProps = {
  label: string;
  options: GroupBase<TGroupedOption>[];
  placeholder?: string;
  name?: string;
  formatSingleValue?: (props: SingleValueProps<TGroupedOption, false>) => JSX.Element;
  formatGroupLabel?: (props: GroupHeadingProps<TGroupedOption, false>) => JSX.Element;
  formatOption?: (props: OptionProps<TGroupedOption, false>) => JSX.Element;
};

const ReactSelect: React.FC<TReactSelectProps> = ({
  label,
  options,
  placeholder,
  name,
  formatSingleValue,
  formatGroupLabel,
  formatOption,
}) => (
  <label className='react-select'>
    {label}
    <Select
      className='react-select__container'
      classNamePrefix='react-select'
      options={options}
      name={name}
      components={{
        GroupHeading: formatGroupLabel,
        Option: formatOption,
        SingleValue: formatSingleValue,
      }}
      placeholder={placeholder}
    />
  </label>
);

export default ReactSelect;
