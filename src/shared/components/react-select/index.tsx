import Select, {
  ControlProps,
  GroupBase,
  GroupHeadingProps,
  OptionProps,
  SingleValueProps,
} from 'react-select';

import { TGroupedOption } from '@/shared/types/react-select';

import './react-select.scss';

export type TReactSelectProps = {
  label: string;
  options: GroupBase<TGroupedOption>[];
  placeholder?: string;
  name?: string;
  error?: string;
  formatControl?: (props: ControlProps<TGroupedOption, false>) => JSX.Element;
  formatSingleValue?: (props: SingleValueProps<TGroupedOption, false>) => JSX.Element;
  formatGroupLabel?: (props: GroupHeadingProps<TGroupedOption, false>) => JSX.Element;
  formatOption?: (props: OptionProps<TGroupedOption, false>) => JSX.Element;
};

const ReactSelect: React.FC<TReactSelectProps> = ({
  label,
  options,
  placeholder,
  name,
  error,
  formatControl,
  formatSingleValue,
  formatGroupLabel,
  formatOption,
}) => (
  <label className='react-select'>
    {label}
    <Select
      className='react-select__container'
      classNamePrefix={`${error ? 'invalid' : 'correct'}-react-select`}
      options={options}
      name={name}
      components={{
        Control: formatControl,
        SingleValue: formatSingleValue,
        GroupHeading: formatGroupLabel,
        Option: formatOption,
      }}
      placeholder={placeholder}
    />
  </label>
);

export default ReactSelect;
