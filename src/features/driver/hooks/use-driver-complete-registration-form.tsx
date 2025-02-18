import { zodResolver } from '@hookform/resolvers/zod';
import { type JWTPayload } from 'jose';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import useRequest from '@/shared/hooks/use-request';

import displaySuccessToast from '@/shared/utils/display-success-toast';
import displayWarningToast from '@/shared/utils/display-warning-toast';

import {
  TDriverCompleteRegistrationFormSchema,
  driverCompleteRegistrationFormSchema,
} from '@/features/driver/schemas/driver-complete-registration-form-schema';

import { ADD_FACIAL_RECOGNITION_ERROR } from '@/test-ids/add-facial-recognition-modal';
import {
  DRIVER_EGISTRATION_COMPLETE_SUCCESS_MESSAGE,
  DRIVER_REGISTRATION_COMPLETE_FAILURE_MESSAGE,
} from '@/test-ids/driver-registration-complete-page';

import { registerDriver } from '../actions/register-driver';
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
  const registrationMessages = useTranslations('DriverRegistrationCompleteMessages');

  const { startRequest, handleSuccess, handleRequestError } = useRequest();

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

    startRequest();

    registerDriver(formData)
      .then(() => {
        handleSuccess();

        displaySuccessToast({
          text: registrationMessages('registrationSuccess'),
          ariaLabel: 'Registered Successfully',
          testId: DRIVER_EGISTRATION_COMPLETE_SUCCESS_MESSAGE,
        });
      })
      .catch(
        handleRequestError({
          uniqueMessage: registrationMessages('registrationError'),
          ariaLabel: 'Registration error',
          testId: DRIVER_REGISTRATION_COMPLETE_FAILURE_MESSAGE,
        }),
      );
  };

  const onOk = () => {
    const isFacialRecognitionAdded = getValues('file');

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
