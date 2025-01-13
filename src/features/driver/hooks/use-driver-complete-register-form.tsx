import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  TDriverCompleteRegisterFormSchema,
  driverCompleteRegisterFormSchema,
} from '@/features/driver/schemas/driver-complete-register-form-schema';

const useDriverCompleteRegisterForm = () => {
  const [isAddFaceImageModalEnabled, setIsAddFaceImageModalEnabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TDriverCompleteRegisterFormSchema>({
    resolver: zodResolver(driverCompleteRegisterFormSchema),
  });

  const onSubmit: SubmitHandler<TDriverCompleteRegisterFormSchema> = async (data) => {
    // TODO - finish driver registration
  };

  const onOk = () => {
    setIsAddFaceImageModalEnabled(false);
  };

  const onCancel = () => {
    setIsAddFaceImageModalEnabled(false);
  };

  return {
    errors,
    isAddFaceImageModalEnabled,
    setIsAddFaceImageModalEnabled,
    register,
    onSubmit,
    onOk,
    onCancel,
    handleSubmit,
  };
};

export default useDriverCompleteRegisterForm;
