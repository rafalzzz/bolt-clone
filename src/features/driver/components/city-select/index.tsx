import Image from 'next/image';
import { useTranslations } from 'next-intl';
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

import { CITY_OPTIONS } from '@/features/driver/consts/city-options';

import { EDriverRegisterFormKeys } from '@/features/driver/enums/driver-register-form-keys';

import { TBasicFormType } from '@/shared/types/basic-form-type';
import { TGroupedOption, TOption } from '@/shared/types/react-select';

const { Control, SingleValue, Option } = components;

type TCitySelect<FormType extends TBasicFormType> = {
  inputKey: Path<FormType>;
  register: UseFormRegister<FormType>;
  setValue: UseFormSetValue<FormType>;
  error?: string;
};

const CitySelect = <FormType extends TBasicFormType>({
  inputKey,
  register,
  setValue,
  error,
}: TCitySelect<FormType>) => {
  const t = useTranslations('CitySelect');

  register(inputKey);

  const formatControl =
    (inputKey: string) =>
    ({ children, ...props }: ControlProps<TOption, false, GroupBase<TOption>>) => (
      <Control {...props} data-testid={`${inputKey}Input`}>
        {children}
      </Control>
    );

  const formatSingleValue = (props: SingleValueProps<TOption, false>) => (
    <SingleValue {...props}>{t(props.data.label)}</SingleValue>
  );

  const formatGroupLabel = (props: GroupHeadingProps<TOption, false>) => {
    const { icon, label } = props.data as unknown as TGroupedOption;

    return (
      <div className='flex items-center p-2'>
        {icon && <Image src={icon} width={20} height={20} alt={`${label} flag`} className='mr-2' />}
        <span>{t(label)}</span>
      </div>
    );
  };

  const formatOption = (props: OptionProps<TOption, false>) => (
    <Option {...props}>
      <div className='flex items-center p-2'>{t(props.data.label)}</div>
    </Option>
  );

  return (
    <ReactSelect
      label={t('cityLabel')}
      inputKey={inputKey}
      setValue={setValue}
      placeholder={t('cityPlaceholder')}
      name={EDriverRegisterFormKeys.CITY}
      options={CITY_OPTIONS}
      error={error}
      formatControl={formatControl(inputKey)}
      formatSingleValue={formatSingleValue}
      formatGroupLabel={formatGroupLabel}
      formatOption={formatOption}
    />
  );
};

export default CitySelect;
