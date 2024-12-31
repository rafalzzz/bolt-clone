'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';

import CitySelect from '@/features/driver/components/city-select';
import RedirectionToLoginPage from '@/features/driver/components/redirection-to-login-page';
import CustomCheckbox from '@/shared/components/custom-checkbox';
import CustomFormWrapper from '@/shared/components/custom-form-wrapper';
import CustomInput from '@/shared/components/custom-input';

import {
  TDriverRegisterFormSchema,
  driverRegisterFormSchema,
} from '@/features/driver/schemas/driver-register-form-schema';

import { POLISH_NUMBER_PREFIX } from '@/features/driver/consts/phone-number-prefixes';

import { EDriverRegisterFormKeys } from '@/features/driver/enums/driver-register-form-keys';

import './driver-register-form.scss';

const DriverRegisterForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TDriverRegisterFormSchema>({
    resolver: zodResolver(driverRegisterFormSchema),
  });

  const t = useTranslations('DriverRegisterForm');

  const onSubmit: SubmitHandler<TDriverRegisterFormSchema> = (data) => {
    console.log(data);
  };

  console.log({ errors });

  return (
    <CustomFormWrapper title={t('header')}>
      <form className='driver-register-form' onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          label='Email'
          inputKey={EDriverRegisterFormKeys.EMAIL}
          register={register}
          error={errors?.[EDriverRegisterFormKeys.EMAIL]?.message}
          props={{
            name: EDriverRegisterFormKeys.EMAIL,
            placeholder: t('emailPlaceholder'),
            type: 'text',
          }}
        />
        <CustomInput
          label={t('phoneNumberLabel')}
          inputKey={EDriverRegisterFormKeys.PHONE_NUMBER}
          register={register}
          error={errors?.[EDriverRegisterFormKeys.PHONE_NUMBER]?.message}
          prefix={
            <>
              <Image
                className='mr-1'
                alt='pl'
                title='pl'
                width={24}
                height={24}
                src='https://hatscripts.github.io/circle-flags/flags/pl.svg'
              />
              {POLISH_NUMBER_PREFIX}
            </>
          }
          props={{
            name: EDriverRegisterFormKeys.PHONE_NUMBER,
            placeholder: t('phoneNumberPlaceholder'),
            type: 'text',
          }}
        />
        <CitySelect
          inputKey={EDriverRegisterFormKeys.CITY}
          register={register}
          setValue={setValue}
          error={errors?.[EDriverRegisterFormKeys.CITY]?.message}
        />
        <CustomCheckbox
          inputKey={EDriverRegisterFormKeys.RULES}
          register={register}
          error={errors?.[EDriverRegisterFormKeys.RULES]?.message}
        >
          {t('termsText')}
        </CustomCheckbox>
        <div>
          <button
            type='submit'
            className='driver-register-form__submit-button default-button-colors '
          >
            {t('submitButtonText')}
          </button>
        </div>
        <RedirectionToLoginPage />
      </form>
    </CustomFormWrapper>
  );
};

export default DriverRegisterForm;
