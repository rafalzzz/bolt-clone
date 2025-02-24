import { zodResolver } from '@hookform/resolvers/zod';
import { type JWTPayload } from 'jose';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import useRequest from '@/shared/hooks/use-request';

import displaySuccessToast from '@/shared/utils/client-side/display-toast';
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

import { EToastType } from '@/shared/enums/toast-type';

import { TRegisterDriverFormData, registerDriver } from '../actions/register-driver';
import { EDriverCompleteRegistrationFormKeys } from '../enums/driver-complete-registration-form-keys';

import useDriverCompleteRegistrationFormFields from './use-driver-complete-registration-form-fields';

type TUseDriverCompleteRegistrationForm = {
  tokenPayload: JWTPayload | null;
};

const useDriverCompleteRegistrationForm = ({
  tokenPayload,
}: TUseDriverCompleteRegistrationForm) => {
  const [isAddFacialRecognitionModalEnabled, setIsAddFacialRecognitionModalEnabled] =
    useState(false);

  const { startRequest, handleSuccess, handleRequestError } = useRequest();

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

  const onSubmit: SubmitHandler<TDriverCompleteRegistrationFormSchema> = async (values) => {
    if (!tokenPayload) {
      return;
    }

    const driverData = { ...tokenPayload, ...values } as TRegisterDriverFormData;

    startRequest();

    registerDriver(driverData)
      .then(() => {
        handleSuccess();

        displaySuccessToast({
          type: EToastType.SUCCESS,
          text: registrationMessages('registrationSuccess'),
          testId: DRIVER_EGISTRATION_COMPLETE_SUCCESS_MESSAGE,
        });
      })
      .catch(
        handleRequestError({
          uniqueMessage: registrationMessages('registrationError'),
          testId: DRIVER_REGISTRATION_COMPLETE_FAILURE_MESSAGE,
        }),
      );
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
