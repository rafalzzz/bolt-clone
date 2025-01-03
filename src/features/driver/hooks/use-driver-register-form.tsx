import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { sendEmailToDriver } from '@/features/driver/actions/send-email-to-driver';

import CustomNotifiacation, { EIconClassName } from '@/shared/components/custom-notification';

import useRequest from '@/shared/hooks/use-request';

import {
  TDriverRegisterFormSchema,
  driverRegisterFormSchema,
} from '@/features/driver/schemas/driver-register-form-schema';

import { DEFAULT_NOTIFICATION_PROPS } from '@/shared/consts/default-notification-props';

import SuccessSvg from '@/shared/svg/success-svg';
import WarningSvg from '@/shared/svg/warning-svg';

const useDriverRegisterForm = () => {
  const { state, startRequest, handleSuccess, handleError } = useRequest();

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TDriverRegisterFormSchema>({
    resolver: zodResolver(driverRegisterFormSchema),
  });

  const t = useTranslations('DriverRegisterForm');

  const onSubmit: SubmitHandler<TDriverRegisterFormSchema> = async (data) => {
    startRequest();

    sendEmailToDriver(data)
      .then(() => {
        handleSuccess();
        reset();

        toast(CustomNotifiacation, {
          data: {
            icon: <SuccessSvg />,
            iconClassName: EIconClassName.SUCCESS,
            text: t('initialRegistrationSuccess'),
          },
          ariaLabel: 'Email has been sent',
          ...DEFAULT_NOTIFICATION_PROPS,
        });
      })
      .catch((error) => {
        handleError(error);

        const errorMessage = 'message' in error ? error.message : t('initialRegistratrionError');

        toast(CustomNotifiacation, {
          data: {
            icon: <WarningSvg />,
            iconClassName: EIconClassName.WARNING,
            text: errorMessage,
          },
          ariaLabel: 'Registration error',
          ...DEFAULT_NOTIFICATION_PROPS,
        });
      });
  };

  return { state, errors, register, setValue, onSubmit, handleSubmit };
};

export default useDriverRegisterForm;
