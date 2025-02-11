import { zodResolver } from '@hookform/resolvers/zod';
import { type JWTPayload } from 'jose';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import {
  TDriverCompleteRegistrationFormSchema,
  driverCompleteRegistrationFormSchema,
} from '@/features/driver/schemas/driver-complete-registration-form-schema';

import { EDriverCompleteRegistrationFormKeys } from '../enums/driver-complete-registration-form-keys';

type TUseDriverCompleteRegistrationForm = {
  tokenPayload: JWTPayload | null;
};

const useDriverCompleteRegistrationForm = ({
  tokenPayload,
}: TUseDriverCompleteRegistrationForm) => {
  const [isAddFacialRecognitionModalEnabled, setIsAddFacialRecognitionModalEnabled] =
    useState(false);

  const {
    register,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<TDriverCompleteRegistrationFormSchema>({
    resolver: zodResolver(driverCompleteRegistrationFormSchema),
  });

  const onSubmit: SubmitHandler<TDriverCompleteRegistrationFormSchema> = async (values) => {
    if (!tokenPayload) {
      return;
    }

    const formData = new FormData();

    const driverData = { ...tokenPayload, ...values };

    Object.keys(driverData).forEach((key) => {
      if (key === EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD) {
        return;
      }

      const value = driverData[key as keyof TDriverCompleteRegistrationFormSchema];
      formData.append(key, value);
    });
  };

  const onOk = () => {
    clearErrors(EDriverCompleteRegistrationFormKeys.FILE);
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

export default useDriverCompleteRegistrationForm;
