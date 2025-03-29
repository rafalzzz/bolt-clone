import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type SubmitHandler, useForm } from 'react-hook-form';

import addCar from '@/features/add-car/server-actions/add-car';

import useAddCarFields from '@/features/add-car/hooks/use-add-car-form-fields';
import useServerAction from '@/shared/hooks/use-server-action';

import {
  type TAddCarFormSchema,
  addCarFormSchema,
} from '@/features/add-car/schemas/add-car-form-schema';

import { ADD_CAR_FAILURE_MESSAGE } from '@/test-ids/add-car-page';

const useAddCar = () => {
  const router = useRouter();
  const t = useTranslations('AddCarForm');
  const { state, handleServerAction } = useServerAction();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddCarFormSchema>({
    resolver: zodResolver(addCarFormSchema),
  });

  const formFields = useAddCarFields({ errors, register, setValue });

  const onSuccess = (redirectPath: unknown) => {
    if (typeof redirectPath === 'string') {
      router.push(redirectPath);
    }
  };

  const onSubmit: SubmitHandler<TAddCarFormSchema> = async (data) => {
    await handleServerAction({
      action: addCar,
      onSuccess,
      actionArgs: data,
      errorMessage: {
        uniqueMessage: t('unknownError'),
        testId: ADD_CAR_FAILURE_MESSAGE,
      },
    });
  };

  return { state, formFields, onSubmit, handleSubmit };
};

export default useAddCar;
