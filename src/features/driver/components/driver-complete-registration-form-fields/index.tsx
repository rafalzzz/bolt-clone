'use client';

import { useTranslations } from 'next-intl';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import CustomInput from '@/shared/components/custom-input';
import PasswordInput from '@/shared/components/password-input';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver/enums/driver-complete-registration-form-keys';

import { TDriverCompleteRegistrationFormSchema } from '../../schemas/driver-complete-registration-form-schema';

type TDriverCompleteRegistrationFormFields = {
  register: UseFormRegister<TDriverCompleteRegistrationFormSchema>;
  errors: FieldErrors<TDriverCompleteRegistrationFormSchema>;
};

const DriverCompleteRegistrationFormFields: React.FC<TDriverCompleteRegistrationFormFields> = ({
  errors,
  register,
}) => {
  const t = useTranslations('DriverCompleteRegistrationForm');

  return (
    <>
      <PasswordInput
        label={t('passwordLabel')}
        inputKey={EDriverCompleteRegistrationFormKeys.PASSWORD}
        error={errors?.[EDriverCompleteRegistrationFormKeys.PASSWORD]?.message}
        register={register}
        props={{
          name: EDriverCompleteRegistrationFormKeys.PASSWORD,
          placeholder: t('passwordPlaceholder'),
          maxLength: 100,
        }}
      />
      <PasswordInput
        label={t('repeatPasswordLabel')}
        inputKey={EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD}
        error={errors?.[EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD]?.message}
        register={register}
        props={{
          name: EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD,
          placeholder: t('repeatPasswordPlaceholder'),
          maxLength: 100,
        }}
      />
      <CustomInput
        label={t('vehicleRegistrationNumberLabel')}
        inputKey={EDriverCompleteRegistrationFormKeys.VEHICLE_REGISTRATION_NUMBER}
        register={register}
        error={errors?.[EDriverCompleteRegistrationFormKeys.VEHICLE_REGISTRATION_NUMBER]?.message}
        props={{
          name: EDriverCompleteRegistrationFormKeys.VEHICLE_REGISTRATION_NUMBER,
          placeholder: t('vehicleRegistrationNumberPlaceholder'),
          type: 'text',
          maxLength: 20,
        }}
      />
    </>
  );
};

export default DriverCompleteRegistrationFormFields;
