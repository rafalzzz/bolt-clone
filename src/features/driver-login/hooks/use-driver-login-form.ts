import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { type SubmitHandler, useForm } from 'react-hook-form';

import useRequest from '@/shared/hooks/use-request';

import {
  type TDriverLoginFormSchema,
  driverLoginFormSchema,
} from '@/features/driver-login/schemas/driver-login-form-schema';

import { LOGIN_FAILURE_MESSAGE } from '@/test-ids/driver-login-page';

import useDriverLoginFormFields from './use-driver-login-form-fields';

const useDriverLoginForm = () => {
  const { state, handleRequest } = useRequest();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TDriverLoginFormSchema>({
    resolver: zodResolver(driverLoginFormSchema),
  });

  const t = useTranslations('DriverLoginForm');
  const formFields = useDriverLoginFormFields({ errors, register, setValue });

  const onSubmit: SubmitHandler<TDriverLoginFormSchema> = async (data) => {
    const response = await handleRequest({
      endpoint: '/driver/send-email/',
      method: 'POST',
      data,
      errorMessage: {
        uniqueMessage: t('loginError'),
        testId: LOGIN_FAILURE_MESSAGE,
      },
    });

    if (response?.ok) {
      // TODO - add logic connected with redirection
    }
  };

  return { state, formFields, onSubmit, handleSubmit };
};

export default useDriverLoginForm;
