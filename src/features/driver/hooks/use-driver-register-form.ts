import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { sendEmailToDriver } from '@/features/driver/actions/send-email-to-driver';

import useRequest from '@/shared/hooks/use-request';

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

  const onSubmit: SubmitHandler<TDriverRegisterFormSchema> = async (data) => {
    startRequest();

    sendEmailToDriver(data)
      .then(() => {
        handleSuccess();
        reset();
      })
      .catch((error) => {
        handleError(error);
      });
  };

  return { state, errors, register, setValue, onSubmit, handleSubmit };
};

export default useDriverRegisterForm;
