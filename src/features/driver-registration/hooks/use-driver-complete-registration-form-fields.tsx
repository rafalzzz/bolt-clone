import { useTranslations } from 'next-intl';
import type { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import useColorOptions from '@/features/driver-registration/hooks/use-color-options';

import type { TDriverCompleteRegistrationFormSchema } from '@/features/driver-registration/schemas/driver-complete-registration-form-schema';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver-registration/enums/driver-complete-registration-form-keys';
import { EFieldType } from '@/shared/enums/field-type';

import { TCustomFormField } from '@/shared/types/custom-form-field';

type TUseDriverCompleteRegistrationFormFields = {
  errors: FieldErrors<TDriverCompleteRegistrationFormSchema>;
  register: UseFormRegister<TDriverCompleteRegistrationFormSchema>;
  setValue: UseFormSetValue<TDriverCompleteRegistrationFormSchema>;
};

const useDriverCompleteRegistrationFormFields = ({
  errors,
  register,
  setValue,
}: TUseDriverCompleteRegistrationFormFields) => {
  const t = useTranslations('DriverCompleteRegistrationForm');

  const options = useColorOptions();

  const formFields: TCustomFormField<TDriverCompleteRegistrationFormSchema>[] = [
    {
      type: EFieldType.TEXT,
      fieldProps: {
        inputKey: EDriverCompleteRegistrationFormKeys.FIRST_NAME,
        label: t('firstNameLabel'),
        error: errors?.[EDriverCompleteRegistrationFormKeys.FIRST_NAME]?.message,
        errorValues: { number: 3 },
        register,
        props: {
          name: EDriverCompleteRegistrationFormKeys.FIRST_NAME,
          placeholder: t('firstNamePlaceholder'),
          type: 'text',
          maxLength: 100,
        },
      },
    },
    {
      type: EFieldType.TEXT,
      fieldProps: {
        inputKey: EDriverCompleteRegistrationFormKeys.LAST_NAME,
        label: t('lastNameLabel'),
        error: errors?.[EDriverCompleteRegistrationFormKeys.LAST_NAME]?.message,
        errorValues: { number: 3 },
        register,
        props: {
          name: EDriverCompleteRegistrationFormKeys.LAST_NAME,
          placeholder: t('lastNamePlaceholder'),
          type: 'text',
          maxLength: 100,
        },
      },
    },
    {
      type: EFieldType.PASSWORD,
      fieldProps: {
        inputKey: EDriverCompleteRegistrationFormKeys.PASSWORD,
        label: t('passwordLabel'),
        error: errors?.[EDriverCompleteRegistrationFormKeys.PASSWORD]?.message,
        register,
        props: {
          name: EDriverCompleteRegistrationFormKeys.PASSWORD,
          placeholder: t('passwordPlaceholder'),
          maxLength: 100,
        },
      },
    },
    {
      type: EFieldType.PASSWORD,
      fieldProps: {
        inputKey: EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD,
        label: t('repeatPasswordLabel'),
        error: errors?.[EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD]?.message,
        register,
        props: {
          name: EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD,
          placeholder: t('repeatPasswordPlaceholder'),
          maxLength: 100,
        },
      },
    },
    {
      type: EFieldType.TEXT,
      fieldProps: {
        inputKey: EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER,
        label: t('carRegistrationNumberLabel'),
        error: errors?.[EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER]?.message,
        errorValues: { number: 4 },
        register,
        props: {
          name: EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER,
          placeholder: t('carRegistrationNumberPlaceholder'),
          type: 'text',
          maxLength: 10,
        },
      },
    },
    {
      type: EFieldType.TEXT,
      fieldProps: {
        inputKey: EDriverCompleteRegistrationFormKeys.CAR_BRAND,
        label: t('carBrandLabel'),
        error: errors?.[EDriverCompleteRegistrationFormKeys.CAR_BRAND]?.message,
        errorValues: { number: 2 },
        register,
        props: {
          name: EDriverCompleteRegistrationFormKeys.CAR_BRAND,
          placeholder: t('carBrandPlaceholder'),
          type: 'text',
          maxLength: 20,
        },
      },
    },
    {
      type: EFieldType.TEXT,
      fieldProps: {
        inputKey: EDriverCompleteRegistrationFormKeys.CAR_MODEL,
        label: t('carModelLabel'),
        error: errors?.[EDriverCompleteRegistrationFormKeys.CAR_MODEL]?.message,
        errorValues: { number: 2 },
        register,
        props: {
          name: EDriverCompleteRegistrationFormKeys.CAR_MODEL,
          placeholder: t('carModelPlaceholder'),
          type: 'text',
          maxLength: 20,
        },
      },
    },
    {
      type: EFieldType.SELECT,
      fieldProps: {
        inputKey: EDriverCompleteRegistrationFormKeys.CAR_COLOR,
        label: t('carColorLabel'),
        placeholder: t('carColorPlaceholder'),
        options,
        error: errors?.[EDriverCompleteRegistrationFormKeys.CAR_COLOR]?.message,
        register,
        setValue,
      },
    },
  ];

  return formFields;
};

export default useDriverCompleteRegistrationFormFields;
