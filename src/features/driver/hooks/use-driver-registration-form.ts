import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { type SubmitHandler, useForm } from 'react-hook-form';

import useDriverRegistrationFormFields from '@/features/driver/hooks/use-driver-registration-form-fields';
import useRequest from '@/shared/hooks/use-request';

import displayToast from '@/shared/utils/client-side/display-toast';

import {
  type TDriverRegistrationFormSchema,
  driverRegistrationFormSchema,
} from '@/features/driver/schemas/driver-registration-form-schema';

import {
  REGISTRATION_FAILURE_MESSAGE,
  REGISTRATION_SUCCESS_MESSAGE,
} from '@/test-ids/driver-registration-page';

import { EToastType } from '@/shared/enums/toast-type';

const useDriverRegistrationForm = () => {
  const { state, handleRequest } = useRequest();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TDriverRegistrationFormSchema>({
    resolver: zodResolver(driverRegistrationFormSchema),
  });

  const t = useTranslations('DriverRegistrationForm');
  const formFields = useDriverRegistrationFormFields({ errors, register, setValue });

  const onSubmit: SubmitHandler<TDriverRegistrationFormSchema> = async (data) => {
    const response = await handleRequest({
      endpoint: '/driver/send-email/',
      method: 'POST',
      data,
      errorMessage: {
        uniqueMessage: t('initialRegistratrionError'),
        testId: REGISTRATION_FAILURE_MESSAGE,
      },
    });

    if (response?.ok) {
      displayToast({
        type: EToastType.SUCCESS,
        text: t('initialRegistrationSuccess'),
        testId: REGISTRATION_SUCCESS_MESSAGE,
      });
    }
  };

  return { state, formFields, onSubmit, handleSubmit };
};

export default useDriverRegistrationForm;
