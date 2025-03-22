import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { type SubmitHandler, useForm } from 'react-hook-form';

import registerDriver from '@/features/driver-registration/server-actions/register-user';

import useDriverCompleteRegistrationFormFields from '@/features/driver-registration/hooks/use-driver-complete-registration-form-fields';
import useServerAction from '@/shared/hooks/use-server-action';

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

import { TDriverRegistrationTokenPayload } from '@/features/driver-registration/types/driver-registration';

type TUseDriverCompleteRegistrationForm = {
  tokenPayload: TDriverRegistrationTokenPayload | null;
};

const useDriverCompleteRegistrationForm = ({
  tokenPayload,
}: TUseDriverCompleteRegistrationForm) => {
  const { state, handleServerAction } = useServerAction();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TDriverCompleteRegistrationFormSchema>({
    resolver: zodResolver(driverCompleteRegistrationFormSchema),
  });

  const registrationMessages = useTranslations('DriverRegistrationCompleteMessages');

  const formFields = useDriverCompleteRegistrationFormFields({ errors, register });

  const onSuccess = () =>
    displayToast({
      type: EToastType.SUCCESS,
      text: registrationMessages('registrationSuccess'),
      testId: DRIVER_EGISTRATION_COMPLETE_SUCCESS_MESSAGE,
    });

  const onSubmit: SubmitHandler<TDriverCompleteRegistrationFormSchema> = async (
    formValues: TDriverCompleteRegistrationFormSchema,
  ) => {
    if (!tokenPayload) {
      return;
    }

    const actionArgs = getDriverCompleteDto(formValues, tokenPayload);

    const errorMessage = {
      uniqueMessage: registrationMessages('registrationError'),
      testId: DRIVER_REGISTRATION_COMPLETE_FAILURE_MESSAGE,
    };

    handleServerAction({
      actionArgs,
      errorMessage,
      action: registerDriver,
      onSuccess,
    });
  };

  return {
    state,
    formFields,
    onSubmit,
    handleSubmit,
  };
};

export default useDriverCompleteRegistrationForm;
