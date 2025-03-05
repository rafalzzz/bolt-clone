import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import useCityOptions from '@/features/driver/hooks/use-city-options';

import type { TDriverRegistrationFormSchema } from '@/features/driver/schemas/driver-registration-form-schema';

import { EDriverRegistrationFormKeys } from '@/features/driver/enums/driver-registration-form-keys';
import { EFieldType } from '@/shared/enums/field-type';

import { POLISH_NUMBER_PREFIX } from '@/features/driver/consts/phone-number-prefixes';

import { TCustomFormField } from '@/shared/types/custom-form-field';

type TUseDriverRegistrationFormFields = {
  errors: FieldErrors<TDriverRegistrationFormSchema>;
  register: UseFormRegister<TDriverRegistrationFormSchema>;
  setValue: UseFormSetValue<TDriverRegistrationFormSchema>;
};

const useDriverRegistrationFormFields = ({
  errors,
  register,
  setValue,
}: TUseDriverRegistrationFormFields) => {
  const t = useTranslations('DriverRegistrationForm');

  const options = useCityOptions();

  const formFields: TCustomFormField<TDriverRegistrationFormSchema>[] = [
    {
      type: EFieldType.TEXT,
      fieldProps: {
        inputKey: EDriverRegistrationFormKeys.EMAIL,
        label: 'Email',
        error: errors?.[EDriverRegistrationFormKeys.EMAIL]?.message,
        register,
        props: {
          name: EDriverRegistrationFormKeys.EMAIL,
          placeholder: t('emailPlaceholder'),
          type: 'text',
          maxLength: 200,
        },
      },
    },
    {
      type: EFieldType.TEXT,
      fieldProps: {
        inputKey: EDriverRegistrationFormKeys.PHONE_NUMBER,
        label: t('phoneNumberLabel'),
        error: errors?.[EDriverRegistrationFormKeys.PHONE_NUMBER]?.message,
        register,
        prefix: (
          <>
            <Image
              className='mr-1'
              alt='pl'
              title='pl'
              width={24}
              height={24}
              src='https://hatscripts.github.io/circle-flags/flags/pl.svg'
            />
            {POLISH_NUMBER_PREFIX}
          </>
        ),
        props: {
          name: EDriverRegistrationFormKeys.PHONE_NUMBER,
          placeholder: t('phoneNumberPlaceholder'),
          type: 'text',
          maxLength: 20,
        },
      },
    },
    {
      type: EFieldType.SELECT,
      fieldProps: {
        inputKey: EDriverRegistrationFormKeys.CITY,
        label: t('cityLabel'),
        placeholder: t('cityPlaceholder'),
        options,
        error: errors?.[EDriverRegistrationFormKeys.CITY]?.message,
        register,
        setValue,
      },
    },
    {
      type: EFieldType.CHECKBOX,
      fieldProps: {
        inputKey: EDriverRegistrationFormKeys.RULES,
        text: t('termsText'),
        error: errors?.[EDriverRegistrationFormKeys.RULES]?.message,
        register,
      },
    },
  ];

  return formFields;
};

export default useDriverRegistrationFormFields;
