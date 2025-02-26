import { zodResolver } from '@hookform/resolvers/zod';
import { type JWTPayload } from 'jose';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import useRequest from '@/shared/hooks/use-request';

import displayToast from '@/shared/utils/client-side/display-toast';

import {
  type TDriverCompleteRegistrationFormSchema,
  driverCompleteRegistrationFormSchema,
} from '@/features/driver/schemas/driver-complete-registration-form-schema';

import { ADD_FACIAL_RECOGNITION_ERROR } from '@/test-ids/add-facial-recognition-modal';
import {
  DRIVER_EGISTRATION_COMPLETE_SUCCESS_MESSAGE,
  DRIVER_REGISTRATION_COMPLETE_FAILURE_MESSAGE,
} from '@/test-ids/driver-registration-complete-page';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver/enums/driver-complete-registration-form-keys';
import { EToastType } from '@/shared/enums/toast-type';

import useDriverCompleteRegistrationFormFields from './use-driver-complete-registration-form-fields';

type TUseDriverCompleteRegistrationForm = {
  tokenPayload: JWTPayload | null;
};

const useDriverCompleteRegistrationForm = ({
  tokenPayload,
}: TUseDriverCompleteRegistrationForm) => {
  const [isAddFacialRecognitionModalEnabled, setIsAddFacialRecognitionModalEnabled] =
    useState(false);

  const { state, handleRequest } = useRequest();

  const {
    register,
    setValue,
    getValues,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<TDriverCompleteRegistrationFormSchema>({
    resolver: zodResolver(driverCompleteRegistrationFormSchema),
  });

  const facialRecognitionMessages = useTranslations('AddFacialRecognitionError');
  const registrationMessages = useTranslations('DriverRegistrationCompleteMessages');

  const formFields = useDriverCompleteRegistrationFormFields({ errors, register });

  const onSubmit: SubmitHandler<TDriverCompleteRegistrationFormSchema> = async (data) => {
    if (!tokenPayload) {
      return;
    }

    const response = await handleRequest({
      endpoint: '/driver/register',
      method: 'POST',
      data: { data, tokenPayload },
      errorMessage: {
        uniqueMessage: registrationMessages('registrationError'),
        testId: DRIVER_REGISTRATION_COMPLETE_FAILURE_MESSAGE,
      },
    });

    if (response?.ok) {
      displayToast({
        type: EToastType.SUCCESS,
        text: registrationMessages('registrationSuccess'),
        testId: DRIVER_EGISTRATION_COMPLETE_SUCCESS_MESSAGE,
      });
    }
  };

  const onOk = () => {
    const isFacialRecognitionAdded = getValues('file');

    if (!isFacialRecognitionAdded) {
      return displayToast({
        text: facialRecognitionMessages('photoIsNotAdded'),
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
    state,
    isAddFacialRecognitionModalEnabled,
    formFields,
    errors,
    setIsAddFacialRecognitionModalEnabled,
    setValue,
    onSubmit,
    onOk,
    onCancel,
    handleSubmit,
  };
};

export default useDriverCompleteRegistrationForm;
