import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { sendEmailToDriver } from '@/features/driver/actions/send-email-to-driver';

import useRequest from '@/shared/hooks/use-request';

import displaySuccessToast from '@/shared/utils/display-success-toast';
import displayWarningToast from '@/shared/utils/display-warning-toast';

import {
  TDriverRegisterFormSchema,
  driverRegisterFormSchema,
} from '@/features/driver/schemas/driver-register-form-schema';

const useDriverRegisterForm = () => {
  const { state, startRequest, handleSuccess, handleError } = useRequest();

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TDriverRegisterFormSchema>({
    resolver: zodResolver(driverRegisterFormSchema),
  });

  const t = useTranslations('DriverRegisterForm');

  const onSubmit: SubmitHandler<TDriverRegisterFormSchema> = async (data) => {
    startRequest();

    sendEmailToDriver(data)
      .then(() => {
        handleSuccess();
        reset();

        displaySuccessToast(t('initialRegistrationSuccess'), 'Email has been sent');
      })
      .catch((error) => {
        handleError(error);

        const text = 'message' in error ? error.message : t('initialRegistratrionError');

        displayWarningToast(text, 'Registration error');
      });
  };

  return { state, errors, register, setValue, onSubmit, handleSubmit };
};

export default useDriverRegisterForm;
