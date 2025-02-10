'use client';

import { useTranslations } from 'next-intl';
import { ToastContainer } from 'react-toastify';

import AddFaceRecognitionModal from '@/features/driver/components/add-facial-recognition-modal';
import CustomError from '@/shared/components/custom-error';
import CustomFormButton from '@/shared/components/custom-form-button';
import CustomFormWrapper from '@/shared/components/custom-form-wrapper';
import CustomInput from '@/shared/components/custom-input';
import PasswordInput from '@/shared/components/password-input';

import useDriverCompleteRegisterForm from '@/features/driver/hooks/use-driver-complete-register-form';

import { EDriverCompleteRegisterFormKeys } from '@/features/driver/enums/driver-complete-register-form-keys';

const DriverCompleteRegisterForm = () => {
  const {
    errors,
    isAddFacialRecognitionModalEnabled,
    setIsAddFacialRecognitionModalEnabled,
    register,
    setValue,
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
          setIsAddFacialRecognitionModalEnabled={setIsAddFacialRecognitionModalEnabled}
          setValue={setValue}
          onOk={onOk}
          onCancel={onCancel}
        />
      )}
      <CustomFormWrapper title={t('header')}>
        <form className='mt-4 space-y-6' onSubmit={handleSubmit(onSubmit)} noValidate>
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
            <CustomFormButton
              text={t('addFaceImageButtonText')}
              additionalClassNames='mt-8'
              buttonProps={{
                type: 'button',
                onClick: () => setIsAddFacialRecognitionModalEnabled((prevState) => !prevState),
              }}
            />
            <CustomError
              inputKey='file'
              error={errors?.[EDriverCompleteRegisterFormKeys.FILE]?.message as string}
            />
            <CustomFormButton
              text={t('submitButtonText')}
              buttonProps={{
                type: 'submit',
              }}
            />
          </div>
        </form>
      </CustomFormWrapper>
    </>
  );
};

export default DriverCompleteRegisterForm;
