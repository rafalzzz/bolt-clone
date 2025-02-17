import { zodResolver } from '@hookform/resolvers/zod';
import { type JWTPayload } from 'jose';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import displayWarningToast from '@/shared/utils/display-warning-toast';

import {
  TDriverCompleteRegistrationFormSchema,
  driverCompleteRegistrationFormSchema,
} from '@/features/driver/schemas/driver-complete-registration-form-schema';

import { ADD_FACIAL_RECOGNITION_ERROR } from '@/test-ids/add-facial-recognition-modal';

import { EDriverCompleteRegistrationFormKeys } from '../enums/driver-complete-registration-form-keys';

type TUseDriverCompleteRegistrationForm = {
  tokenPayload: JWTPayload | null;
};

const useDriverCompleteRegistrationForm = ({
  tokenPayload,
}: TUseDriverCompleteRegistrationForm) => {
  const [isAddFacialRecognitionModalEnabled, setIsAddFacialRecognitionModalEnabled] =
    useState(false);

  const t = useTranslations('AddFacialRecognitionError');

  const {
    register,
    getValues,
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

    // TODO - connect form to BE
  };

  const onOk = () => {
    const isFacialRecognitionAdded = getValues('file');

    console.log({ isFacialRecognitionAdded });

    if (!isFacialRecognitionAdded) {
      return displayWarningToast({
        text: t('photoIsNotAdded'),
        ariaLabel: t('photoIsNotAdded'),
        testId: ADD_FACIAL_RECOGNITION_ERROR,
      });
    }

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
