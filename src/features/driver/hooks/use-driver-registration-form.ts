import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { sendEmailToDriver } from '@/features/driver/actions/send-email-to-driver';

import useDriverRegistrationFormFields from '@/features/driver/hooks/use-driver-registration-form-fields';
import useRequest from '@/shared/hooks/use-request';

import displaySuccessToast from '@/shared/utils/display-success-toast';

import {
  TDriverRegistrationFormSchema,
  driverRegistrationFormSchema,
} from '@/features/driver/schemas/driver-registration-form-schema';

import {
  REGISTRATION_FAILURE_MESSAGE,
  REGISTRATION_SUCCESS_MESSAGE,
} from '@/test-ids/driver-registration-page';

const useDriverRegistrationForm = () => {
  const { state, startRequest, handleSuccess, handleRequestError } = useRequest();

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
  const formFields = useDriverRegistrationFormFields({ errors, register, setValue });

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
      .catch(
        handleRequestError({
          uniqueMessage: t('initialRegistratrionError'),
          ariaLabel: 'Registration error',
          testId: REGISTRATION_FAILURE_MESSAGE,
        }),
      );
  };

  return { state, formFields, onSubmit, handleSubmit };
};

export default useDriverRegistrationForm;
