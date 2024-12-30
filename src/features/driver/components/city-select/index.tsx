import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
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

import { TGroupedOption } from '@/shared/types/react-select';

import './city-select.scss';

const { Control, SingleValue, Option } = components;

type TCitySelect = {
  error?: string;
};

const CitySelect: FC<TCitySelect> = ({ error }) => {
  const t = useTranslations('CitySelect');

  const formatControl = ({ children, ...props }: ControlProps<TGroupedOption, false>) => (
    <Control className='city-select__correct-control' {...props}>
      {children}
    </Control>
  );

  const formatSingleValue = (props: SingleValueProps<TGroupedOption, false>) => (
    <SingleValue {...props}>{t(props.data.label)}</SingleValue>
  );

  const formatGroupLabel = (props: GroupHeadingProps<TGroupedOption, false>) => {
    const { icon, label } = props.data as unknown as TGroupedOption;

    return (
      <div className='city-select__option'>
        {icon && <Image src={icon} width={20} height={20} alt={`${label} flag`} className='mr-2' />}
        <span>{t(label)}</span>
      </div>
    );
  };

  const formatOption = (props: OptionProps<TGroupedOption, false>) => (
    <Option {...props}>
      <div className='city-select__option'>{t(props.data.label)}</div>
    </Option>
  );

  return (
    <ReactSelect
      label={t('cityLabel')}
      placeholder={t('cityPlaceholder')}
      name={EDriverRegisterFormKeys.CITY}
      options={CITY_OPTIONS as unknown as GroupBase<TGroupedOption>[]}
      error={error}
      formatControl={formatControl}
      formatSingleValue={formatSingleValue}
      formatGroupLabel={formatGroupLabel}
      formatOption={formatOption}
    />
  );
};

export default CitySelect;
