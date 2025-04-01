import { useTranslations } from 'next-intl';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { TDriverCompleteRegistrationFormSchema } from '@/features/driver-registration/schemas/driver-complete-registration-form-schema';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver-registration/enums/driver-complete-registration-form-keys';
import { EFieldType } from '@/shared/enums/field-type';

import { TCustomFormField } from '@/shared/types/custom-form-field';

type TUseDriverCompleteRegistrationFormFields = {
  errors: FieldErrors<TDriverCompleteRegistrationFormSchema>;
  register: UseFormRegister<TDriverCompleteRegistrationFormSchema>;
};

const useDriverCompleteRegistrationFormFields = ({
  errors,
  register,
}: TUseDriverCompleteRegistrationFormFields) => {
  const t = useTranslations('DriverCompleteRegistrationForm');

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
  ];

  return formFields;
};

export default useDriverCompleteRegistrationFormFields;
