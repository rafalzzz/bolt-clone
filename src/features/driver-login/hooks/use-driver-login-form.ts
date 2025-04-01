import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type SubmitHandler, useForm } from 'react-hook-form';

import loginDriver from '@/features/driver-login/server-actions/login-driver';

import useDriverLoginFormFields from '@/features/driver-login/hooks/use-driver-login-form-fields';
import useServerAction from '@/shared/hooks/use-server-action';

import {
  type TDriverLoginFormSchema,
  driverLoginFormSchema,
} from '@/features/driver-login/schemas/driver-login-form-schema';

import { DRIVER_LOGIN_FAILURE_MESSAGE } from '@/test-ids/driver-login-page';

const useDriverLoginForm = () => {
  const router = useRouter();
  const t = useTranslations('LoginAction');
  const { state, handleServerAction } = useServerAction();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TDriverLoginFormSchema>({
    resolver: zodResolver(driverLoginFormSchema),
  });

  const formFields = useDriverLoginFormFields({ errors, register, setValue });

  const onSuccess = (redirectPath: unknown) => {
    if (typeof redirectPath === 'string') {
      router.push(redirectPath);
    }
  };

  const onSubmit: SubmitHandler<TDriverLoginFormSchema> = async (data) => {
    await handleServerAction({
      action: loginDriver,
      onSuccess,
      actionArgs: data,
      errorMessage: {
        uniqueMessage: t('unknownError'),
        testId: DRIVER_LOGIN_FAILURE_MESSAGE,
      },
    });
  };

  return { state, formFields, onSubmit, handleSubmit };
};

export default useDriverLoginForm;
