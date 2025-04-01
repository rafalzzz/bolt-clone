import { useTranslations } from 'next-intl';
import type { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { TDriverLoginFormSchema } from '@/features/driver-login/schemas/driver-login-form-schema';

import { EDriverLoginFormKeys } from '@/features/driver-login/enums/driver-login-form-keys';
import { EFieldType } from '@/shared/enums/field-type';

import { TCustomFormField } from '@/shared/types/custom-form-field';

type TUseDriverLoginFormFields = {
  errors: FieldErrors<TDriverLoginFormSchema>;
  register: UseFormRegister<TDriverLoginFormSchema>;
  setValue: UseFormSetValue<TDriverLoginFormSchema>;
};

const useDriverLoginFormFields = ({ errors, register }: TUseDriverLoginFormFields) => {
  const t = useTranslations('DriverLoginForm');

  const formFields: TCustomFormField<TDriverLoginFormSchema>[] = [
    {
      type: EFieldType.TEXT,
      fieldProps: {
        inputKey: EDriverLoginFormKeys.EMAIL,
        label: 'Email',
        error: errors?.[EDriverLoginFormKeys.EMAIL]?.message,
        register,
        props: {
          name: EDriverLoginFormKeys.EMAIL,
          placeholder: t('emailPlaceholder'),
          type: 'text',
          maxLength: 200,
        },
      },
    },
    {
      type: EFieldType.PASSWORD,
      fieldProps: {
        inputKey: EDriverLoginFormKeys.PASSWORD,
        label: t('passwordLabel'),
        error: errors?.[EDriverLoginFormKeys.PASSWORD]?.message,
        register,
        props: {
          name: EDriverLoginFormKeys.PASSWORD,
          placeholder: t('passwordPlaceholder'),
          maxLength: 100,
        },
      },
    },
  ];

  return formFields;
};

export default useDriverLoginFormFields;
