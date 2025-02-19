import { useTranslations } from 'next-intl';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver/enums/driver-complete-registration-form-keys';
import { EFieldType } from '@/shared/enums/field-type';

import { TCustomFormField } from '@/shared/types/custom-form-field';

import type { TDriverCompleteRegistrationFormSchema } from '../schemas/driver-complete-registration-form-schema';

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
        inputKey: EDriverCompleteRegistrationFormKeys.VEHICLE_REGISTRATION_NUMBER,
        label: t('vehicleRegistrationNumberLabel'),
        error: errors?.[EDriverCompleteRegistrationFormKeys.VEHICLE_REGISTRATION_NUMBER]?.message,
        register,
        props: {
          name: EDriverCompleteRegistrationFormKeys.VEHICLE_REGISTRATION_NUMBER,
          placeholder: t('vehicleRegistrationNumberPlaceholder'),
          type: 'text',
          maxLength: 10,
        },
      },
    },
  ];

  return formFields;
};

export default useDriverCompleteRegistrationFormFields;
