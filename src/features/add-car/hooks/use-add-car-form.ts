import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { type SubmitHandler, useForm } from 'react-hook-form';

import addCar from '@/features/add-car/server-actions/add-car';

import useAddCarFields from '@/features/add-car/hooks/use-add-car-form-fields';
import useServerAction from '@/shared/hooks/use-server-action';

import displayToast from '@/shared/utils/client-side/display-toast';

import {
  type TAddCarFormSchema,
  addCarFormSchema,
} from '@/features/add-car/schemas/add-car-form-schema';

import { ADD_CAR_FAILURE_MESSAGE, ADD_CAR_SUCCESS_MESSAGE } from '@/test-ids/add-car-page';

import { EToastType } from '@/shared/enums/toast-type';

const useAddCar = () => {
  const { state, handleServerAction } = useServerAction();

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

  const onSuccess = () =>
    displayToast({
      type: EToastType.SUCCESS,
      text: t('addCarSuccess'),
      testId: ADD_CAR_SUCCESS_MESSAGE,
    });

  const onSubmit: SubmitHandler<TAddCarFormSchema> = async (data) => {
    await handleServerAction({
      action: addCar,
      onSuccess,
      actionArgs: data,
    });
  };

  return { state, formFields, onSubmit, handleSubmit };
};

export default useAddCar;
