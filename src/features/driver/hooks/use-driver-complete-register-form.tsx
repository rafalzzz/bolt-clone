import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  TDriverCompleteRegisterFormSchema,
  driverCompleteRegisterFormSchema,
} from '@/features/driver/schemas/driver-complete-register-form-schema';

const useDriverCompleteRegisterForm = () => {
  const [isAddFacialRecognitionModalEnabled, setIsAddFacialRecognitionModalEnabled] =
    useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TDriverCompleteRegisterFormSchema>({
    resolver: zodResolver(driverCompleteRegisterFormSchema),
  });

  const onSubmit: SubmitHandler<TDriverCompleteRegisterFormSchema> = async () => {
    // TODO - finish driver registration
  };

  const onOk = () => {
    setIsAddFacialRecognitionModalEnabled(false);
  };

  const onCancel = () => {
    setIsAddFacialRecognitionModalEnabled(false);
  };

  return {
    errors,
    isAddFacialRecognitionModalEnabled,
    setIsAddFacialRecognitionModalEnabled,
    register,
    setValue,
    onSubmit,
    onOk,
    onCancel,
    handleSubmit,
  };
};

export default useDriverCompleteRegisterForm;
