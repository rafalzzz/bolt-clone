import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { type SubmitHandler, useForm } from 'react-hook-form';

import useAddCarFields from '@/features/add-car/hooks/use-add-car-form-fields';
import useRequest from '@/shared/hooks/use-request';

import displayToast from '@/shared/utils/client-side/display-toast';

import {
  type TAddCarFormSchema,
  addCarFormSchema,
} from '@/features/add-car/schemas/add-car-form-schema';

import { ADD_CAR_FAILURE_MESSAGE, ADD_CAR_SUCCESS_MESSAGE } from '@/test-ids/add-car-page';

import { EToastType } from '@/shared/enums/toast-type';

const useAddCar = () => {
  const { state, handleRequest } = useRequest();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddCarFormSchema>({
    resolver: zodResolver(addCarFormSchema),
  });

  const t = useTranslations('AddCarForm');
  const formFields = useAddCarFields({ errors, register, setValue });

  const onSubmit: SubmitHandler<TAddCarFormSchema> = async (data) => {
    const response = await handleRequest({
      endpoint: '/driver/add-car/',
      method: 'PATCH',
      data,
      errorMessage: {
        uniqueMessage: t('initialRegistratrionError'),
        testId: ADD_CAR_FAILURE_MESSAGE,
      },
    });

    if (response?.ok) {
      displayToast({
        type: EToastType.SUCCESS,
        text: t('initialRegistrationSuccess'),
        testId: ADD_CAR_SUCCESS_MESSAGE,
      });
    }
  };

  return { state, formFields, onSubmit, handleSubmit };
};

export default useAddCar;
