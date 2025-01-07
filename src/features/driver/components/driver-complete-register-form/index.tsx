'use client';

import { useTranslations } from 'next-intl';
import { ToastContainer } from 'react-toastify';

import CustomFormWrapper from '@/shared/components/custom-form-wrapper';
import PasswordInput from '@/shared/components/password-input';

import useDriverCompleteRegisterForm from '@/features/driver/hooks/use-driver-complete-register-form';

import { EDriverCompleteRegisterFormKeys } from '@/features/driver/enums/driver-complete-register-form-keys';

import './driver-complete-register-form.scss';

const DriverCompleteRegisterForm = () => {
  const { errors, register, onSubmit, handleSubmit } = useDriverCompleteRegisterForm();

  const t = useTranslations('DriverCompleteRegisterForm');

  return (
    <>
      <ToastContainer />
      <CustomFormWrapper title={t('header')}>
        <form
          className='driver-complete-register-form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <PasswordInput
            label={t('passwordLabel')}
            inputKey={EDriverCompleteRegisterFormKeys.PASSWORD}
            error={errors?.[EDriverCompleteRegisterFormKeys.PASSWORD]?.message}
            register={register}
            props={{
              name: EDriverCompleteRegisterFormKeys.PASSWORD,
              placeholder: t('passwordPlaceholder'),
            }}
          />
          <PasswordInput
            label={t('repeatPasswordLabel')}
            inputKey={EDriverCompleteRegisterFormKeys.REPEAT_PASSWORD}
            error={errors?.[EDriverCompleteRegisterFormKeys.REPEAT_PASSWORD]?.message}
            register={register}
            props={{
              name: EDriverCompleteRegisterFormKeys.REPEAT_PASSWORD,
              placeholder: t('repeatPasswordPlaceholder'),
            }}
          />
          <div>
            <button
              type='submit'
              className='driver-complete-register-form__submit-button default-button-colors '
              aria-label={t('submitButtonText')}
            >
              {t('submitButtonText')}
            </button>
          </div>
        </form>
      </CustomFormWrapper>
    </>
  );
};

export default DriverCompleteRegisterForm;
