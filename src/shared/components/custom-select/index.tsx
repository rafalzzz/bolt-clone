import Image from 'next/image';
import { Path, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import {
  ControlProps,
  GroupBase,
  GroupHeadingProps,
  OptionProps,
  SingleValueProps,
  components,
} from 'react-select';

import ReactSelect from '@/shared/components/react-select';

import { TBasicFormType } from '@/shared/types/basic-form-type';
import { TGroupedOption, TOption } from '@/shared/types/react-select';

const { Control, SingleValue, Option } = components;

export type TCustomSelect<FormType extends TBasicFormType> = {
  inputKey: Path<FormType>;
  label: string;
  placeholder: string;
  options: TGroupedOption[];
  register: UseFormRegister<FormType>;
  setValue: UseFormSetValue<FormType>;
  error?: string;
};

const CustomSelect = <FormType extends TBasicFormType>({
  inputKey,
  label,
  placeholder,
  options,
  register,
  setValue,
  error,
}: TCustomSelect<FormType>) => {
  register(inputKey);

  const formatControl = ({
    children,
    ...props
  }: ControlProps<TOption, false, GroupBase<TOption>>) => (
    <Control {...props} data-testid={`${inputKey}Input`}>
      {children}
    </Control>
  );

  const formatSingleValue = (props: SingleValueProps<TOption, false>) => (
    <SingleValue {...props}>{props.data.label}</SingleValue>
  );

  const formatGroupLabel = (props: GroupHeadingProps<TOption, false>) => {
    const { icon, label } = props.data as TGroupedOption;

    return (
      <div className='flex items-center p-2'>
        {icon && <Image src={icon} width={20} height={20} alt={`${label} flag`} className='mr-2' />}
        <span>{label}</span>
      </div>
    );
  };

  const formatOption = (props: OptionProps<TOption, false>) => (
    <Option {...props}>
      <div className='flex items-center p-2'>{props.data.label}</div>
    </Option>
  );

  return (
    <ReactSelect
      label={label}
      inputKey={inputKey}
      placeholder={placeholder}
      name={inputKey}
      options={options}
      error={error}
      setValue={setValue}
      formatControl={formatControl}
      formatSingleValue={formatSingleValue}
      formatGroupLabel={formatGroupLabel}
      formatOption={formatOption}
    />
  );
};

export default CustomSelect;
