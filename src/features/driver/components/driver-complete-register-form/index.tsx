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
        <form className='driver-complete-register-form' onSubmit={handleSubmit(onSubmit)}>
          <PasswordInput
            label={t('passwordLabel')}
            inputKey={EDriverCompleteRegisterFormKeys.PASSWORD}
            register={register}
            error={errors?.[EDriverCompleteRegisterFormKeys.PASSWORD]?.message}
            props={{
              name: EDriverCompleteRegisterFormKeys.PASSWORD,
              placeholder: t('passwordPlaceholder'),
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
