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

import { REGISTRATION_FAILURE_MESSAGE, REGISTRATION_SUCCESS_MESSAGE } from '@/test-ids/driver-page';

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

        displaySuccessToast({
          text: t('initialRegistrationSuccess'),
          ariaLabel: 'Email has been sent',
          testId: REGISTRATION_SUCCESS_MESSAGE,
        });
      })
      .catch((error: unknown) => {
        const errorMessage =
          error instanceof Error ? error.message : t('initialRegistratrionError');

        handleError(errorMessage);

        displayWarningToast({
          text: errorMessage,
          ariaLabel: 'Registration error',
          testId: REGISTRATION_FAILURE_MESSAGE,
        });
      });
  };

  return { state, errors, register, setValue, onSubmit, handleSubmit };
};

export default useDriverRegisterForm;
