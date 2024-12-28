import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Dispatch, FC, SetStateAction } from 'react';
import { GroupBase, GroupHeadingProps, OptionProps, components } from 'react-select';

import ReactSelect from '@/shared/components/react-select';

import { CITY_OPTIONS } from '@/features/driver/consts/city-options';

import { TGroupedOption, TOption } from '@/shared/types/react-select';

import './city-select.scss';

type TCitySelect = {
  cityOption: TOption | null;
  setCityOption: Dispatch<SetStateAction<TOption | null>>;
};

const { Option } = components;

const CitySelect: FC<TCitySelect> = ({ cityOption, setCityOption }) => {
  const t = useTranslations('CitySelect');

  const value = cityOption ? { ...cityOption, label: t(cityOption?.label) } : null;

  const formatGroupLabel = (props: GroupHeadingProps<TGroupedOption, false>) => {
    const { icon, label } = props.data as unknown as TGroupedOption;

    return (
      <div className='cityOption-select__option'>
        {icon && <Image src={icon} width={20} height={20} alt={`${label} flag`} className='mr-2' />}
        <span>{t(label)}</span>
      </div>
    );
  };

  const formatOption = (props: OptionProps<TGroupedOption, false>) => (
    <Option {...props}>
      <div className='cityOption-select__option'>{t(props.data.label)}</div>
    </Option>
  );

  return (
    <ReactSelect
      label={t('cityLabel')}
      placeholder={t('cityPlaceholder')}
      value={value}
      setValue={setCityOption}
      options={CITY_OPTIONS as unknown as GroupBase<TGroupedOption>[]}
      formatGroupLabel={formatGroupLabel}
      formatOption={formatOption}
    />
  );
};

export default CitySelect;
