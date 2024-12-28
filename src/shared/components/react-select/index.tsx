import { Dispatch, SetStateAction } from 'react';
import Select, { GroupBase, GroupHeadingProps, OptionProps, PropsValue } from 'react-select';

import { TGroupedOption, TNewValue, TOption } from '@/shared/types/react-select';

import './react-select.scss';

export type TReactSelectProps = {
  label: string;
  options: GroupBase<TGroupedOption>[];
  value: TOption | null;
  setValue: Dispatch<SetStateAction<TOption | null>>;
  placeholder?: string;
  formatGroupLabel?: (props: GroupHeadingProps<TGroupedOption, false>) => JSX.Element;
  formatOption?: (props: OptionProps<TGroupedOption, false>) => JSX.Element;
};

const ReactSelect: React.FC<TReactSelectProps> = ({
  label,
  value,
  options,
  setValue,
  placeholder,
  formatGroupLabel,
  formatOption,
}) => {
  const onChange = (option: TNewValue) => {
    setValue(option as unknown as TOption);
  };

  return (
    <label className='react-select'>
      {label}
      <Select
        className='react-select__container'
        classNamePrefix='react-select'
        value={value as PropsValue<TGroupedOption>}
        options={options}
        components={{ GroupHeading: formatGroupLabel, Option: formatOption }}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
};

export default ReactSelect;
