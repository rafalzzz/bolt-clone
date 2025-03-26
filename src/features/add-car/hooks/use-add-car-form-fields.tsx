import { useTranslations } from 'next-intl';
import type { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import useColorOptions from '@/features/add-car/hooks/use-color-options';

import { TAddCarFormSchema } from '@/features/add-car/schemas/add-car-form-schema';

import { EAddCarFormKeys } from '@/features/add-car/enums/add-car-form-keys';
import { EFieldType } from '@/shared/enums/field-type';

import { TCustomFormField } from '@/shared/types/custom-form-field';

type TUseAddCarFormFields = {
  errors: FieldErrors<TAddCarFormSchema>;
  register: UseFormRegister<TAddCarFormSchema>;
  setValue: UseFormSetValue<TAddCarFormSchema>;
};

const useAddCarFormFields = ({ errors, register, setValue }: TUseAddCarFormFields) => {
  const options = useColorOptions();
  const t = useTranslations('AddCarForm');

  const formFields: TCustomFormField<TAddCarFormSchema>[] = [
    {
      type: EFieldType.TEXT,
      fieldProps: {
        inputKey: EAddCarFormKeys.CAR_REGISTRATION_NUMBER,
        label: t('carRegistrationNumberLabel'),
        error: errors?.[EAddCarFormKeys.CAR_REGISTRATION_NUMBER]?.message,
        errorValues: { number: 4 },
        register,
        props: {
          name: EAddCarFormKeys.CAR_REGISTRATION_NUMBER,
          placeholder: t('carRegistrationNumberPlaceholder'),
          type: 'text',
          maxLength: 10,
        },
      },
    },
    {
      type: EFieldType.TEXT,
      fieldProps: {
        inputKey: EAddCarFormKeys.CAR_BRAND,
        label: t('carBrandLabel'),
        error: errors?.[EAddCarFormKeys.CAR_BRAND]?.message,
        errorValues: { number: 2 },
        register,
        props: {
          name: EAddCarFormKeys.CAR_BRAND,
          placeholder: t('carBrandPlaceholder'),
          type: 'text',
          maxLength: 20,
        },
      },
    },
    {
      type: EFieldType.TEXT,
      fieldProps: {
        inputKey: EAddCarFormKeys.CAR_MODEL,
        label: t('carModelLabel'),
        error: errors?.[EAddCarFormKeys.CAR_MODEL]?.message,
        errorValues: { number: 2 },
        register,
        props: {
          name: EAddCarFormKeys.CAR_MODEL,
          placeholder: t('carModelPlaceholder'),
          type: 'text',
          maxLength: 20,
        },
      },
    },
    {
      type: EFieldType.SELECT,
      fieldProps: {
        inputKey: EAddCarFormKeys.CAR_COLOR,
        label: t('carColorLabel'),
        placeholder: t('carColorPlaceholder'),
        options,
        error: errors?.[EAddCarFormKeys.CAR_COLOR]?.message,
        register,
        setValue,
      },
    },
  ];

  return formFields;
};

export default useAddCarFormFields;
