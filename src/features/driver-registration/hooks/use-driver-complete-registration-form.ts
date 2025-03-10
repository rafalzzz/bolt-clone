import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import useDriverCompleteRegistrationFormFields from '@/features/driver-registration/hooks/use-driver-complete-registration-form-fields';
import useRequest from '@/shared/hooks/use-request';

import displayToast from '@/shared/utils/client-side/display-toast';

import {
  type TDriverCompleteRegistrationFormSchema,
  driverCompleteRegistrationFormSchema,
} from '@/features/driver-registration/schemas/driver-complete-registration-form-schema';

import { ADD_FACIAL_RECOGNITION_ERROR } from '@/test-ids/add-facial-recognition-modal';
import {
  DRIVER_EGISTRATION_COMPLETE_SUCCESS_MESSAGE,
  DRIVER_REGISTRATION_COMPLETE_FAILURE_MESSAGE,
} from '@/test-ids/driver-registration-complete-page';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver-registration/enums/driver-complete-registration-form-keys';
import { EToastType } from '@/shared/enums/toast-type';

import { TDriverRegistrationTokenPayload } from '@/features/driver-registration/types';

import getDriverFormData from '../utils/get-driver-form-data';

type TUseDriverCompleteRegistrationForm = {
  tokenPayload: TDriverRegistrationTokenPayload | null;
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

  const formFields = useDriverCompleteRegistrationFormFields({ errors, register, setValue });

  const onSubmit: SubmitHandler<TDriverCompleteRegistrationFormSchema> = async (
    formValues: TDriverCompleteRegistrationFormSchema,
  ) => {
    if (!tokenPayload) {
      return;
    }

    const data = getDriverFormData({ tokenPayload, formValues });

    const response = await handleRequest({
      endpoint: '/driver-registration/register/',
      method: 'POST',
      data,
      addHeaders: false,
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
