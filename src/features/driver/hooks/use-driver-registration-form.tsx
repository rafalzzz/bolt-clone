import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { sendEmailToDriver } from '@/features/driver/actions/send-email-to-driver';

import useRequest from '@/shared/hooks/use-request';

import displaySuccessToast from '@/shared/utils/display-success-toast';
import displayWarningToast from '@/shared/utils/display-warning-toast';

import {
  TDriverRegistrationFormSchema,
  driverRegistrationFormSchema,
} from '@/features/driver/schemas/driver-registration-form-schema';

import {
  REGISTRATION_FAILURE_MESSAGE,
  REGISTRATION_SUCCESS_MESSAGE,
} from '@/test-ids/driver-registration-page';

const useDriverRegistrationForm = () => {
  const { state, startRequest, handleSuccess, handleError } = useRequest();

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TDriverRegistrationFormSchema>({
    resolver: zodResolver(driverRegistrationFormSchema),
  });

  const t = useTranslations('DriverRegistrationForm');

  const onSubmit: SubmitHandler<TDriverRegistrationFormSchema> = async (data) => {
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

export default useDriverRegistrationForm;
