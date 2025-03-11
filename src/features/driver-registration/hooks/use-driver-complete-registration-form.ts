import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { type SubmitHandler, useForm } from 'react-hook-form';

import useDriverCompleteRegistrationFormFields from '@/features/driver-registration/hooks/use-driver-complete-registration-form-fields';
import useRequest from '@/shared/hooks/use-request';

import getDriverCompleteDto from '@/features/driver-registration/utils/get-driver-complete-dto';
import displayToast from '@/shared/utils/client-side/display-toast';

import {
  type TDriverCompleteRegistrationFormSchema,
  driverCompleteRegistrationFormSchema,
} from '@/features/driver-registration/schemas/driver-complete-registration-form-schema';

import {
  DRIVER_EGISTRATION_COMPLETE_SUCCESS_MESSAGE,
  DRIVER_REGISTRATION_COMPLETE_FAILURE_MESSAGE,
} from '@/test-ids/driver-registration-complete-page';

import { EToastType } from '@/shared/enums/toast-type';

import { TDriverRegistrationTokenPayload } from '@/features/driver-registration/types';

type TUseDriverCompleteRegistrationForm = {
  tokenPayload: TDriverRegistrationTokenPayload | null;
};

const useDriverCompleteRegistrationForm = ({
  tokenPayload,
}: TUseDriverCompleteRegistrationForm) => {
  const { state, handleRequest } = useRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TDriverCompleteRegistrationFormSchema>({
    resolver: zodResolver(driverCompleteRegistrationFormSchema),
  });

  const registrationMessages = useTranslations('DriverRegistrationCompleteMessages');

  const formFields = useDriverCompleteRegistrationFormFields({ errors, register });

  const onSubmit: SubmitHandler<TDriverCompleteRegistrationFormSchema> = async (
    formValues: TDriverCompleteRegistrationFormSchema,
  ) => {
    if (!tokenPayload) {
      return;
    }

    const data = getDriverCompleteDto(formValues, tokenPayload);

    const response = await handleRequest({
      endpoint: '/driver/register/',
      method: 'POST',
      data,
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

  return {
    state,
    formFields,
    onSubmit,
    handleSubmit,
  };
};

export default useDriverCompleteRegistrationForm;
