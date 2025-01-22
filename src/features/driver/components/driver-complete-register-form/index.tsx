'use client';

import { useTranslations } from 'next-intl';
import { ToastContainer } from 'react-toastify';

import AddFaceRecognitionModal from '@/features/driver/components/add-facial-recognition-modal';
import CustomFormWrapper from '@/shared/components/custom-form-wrapper';
import CustomInput from '@/shared/components/custom-input';
import PasswordInput from '@/shared/components/password-input';

import useDriverCompleteRegisterForm from '@/features/driver/hooks/use-driver-complete-register-form';

import { EDriverCompleteRegisterFormKeys } from '@/features/driver/enums/driver-complete-register-form-keys';

import './driver-complete-register-form.scss';

const DriverCompleteRegisterForm = () => {
  const {
    errors,
    isAddFacialRecognitionModalEnabled,
    setIsAddFacialRecognitionModalEnabled,
    register,
    onSubmit,
    onOk,
    onCancel,
    handleSubmit,
  } = useDriverCompleteRegisterForm();

  const t = useTranslations('DriverCompleteRegisterForm');

  return (
    <>
      <ToastContainer />
      {isAddFacialRecognitionModalEnabled && (
        <AddFaceRecognitionModal
          isVisible={isAddFacialRecognitionModalEnabled}
          onOk={onOk}
          onCancel={onCancel}
        />
      )}
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
          <CustomInput
            label={t('vehicleRegistrationNumberLabel')}
            inputKey={EDriverCompleteRegisterFormKeys.VEHICLE_REGISTRATION_NUMBER}
            register={register}
            error={errors?.[EDriverCompleteRegisterFormKeys.VEHICLE_REGISTRATION_NUMBER]?.message}
            props={{
              name: EDriverCompleteRegisterFormKeys.VEHICLE_REGISTRATION_NUMBER,
              placeholder: t('vehicleRegistrationNumberPlaceholder'),
              type: 'text',
            }}
          />
          <div>
            <button
              type='button'
              className='driver-complete-register-form__submit-button default-button-colors '
              aria-label={t('addFaceImageButtonText')}
              onClick={() => setIsAddFacialRecognitionModalEnabled((prevState) => !prevState)}
            >
              {t('addFaceImageButtonText')}
            </button>
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
