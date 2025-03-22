import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { type SubmitHandler, useForm } from 'react-hook-form';

import useDriverLoginFormFields from '@/features/driver-login/hooks/use-driver-login-form-fields';
import useRequest from '@/shared/hooks/use-request';

import {
  type TDriverLoginFormSchema,
  driverLoginFormSchema,
} from '@/features/driver-login/schemas/driver-login-form-schema';

import { DRIVER_LOGIN_FAILURE_MESSAGE } from '@/test-ids/driver-login-page';

import loginDriverAction from '@/features/driver-login/server-actions/login-driver';

const useDriverLoginForm = () => {
  const { state, startRequest, handleSuccess, handleRequestError } = useRequest();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TDriverLoginFormSchema>({
    resolver: zodResolver(driverLoginFormSchema),
  });

  const t = useTranslations('LoginAction');
  const formFields = useDriverLoginFormFields({ errors, register, setValue });

  const onSubmit: SubmitHandler<TDriverLoginFormSchema> = async (data) => {
    startRequest();

    try {
      await loginDriverAction(data);

      handleSuccess();
    } catch (error) {
      const uniqueMessage = {
        uniqueMessage: t('unknownError'),
        testId: DRIVER_LOGIN_FAILURE_MESSAGE,
      };

      handleRequestError(uniqueMessage, error);
    }
  };

  return { state, formFields, onSubmit, handleSubmit };
};

export default useDriverLoginForm;
