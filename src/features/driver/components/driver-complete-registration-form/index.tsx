'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { ToastContainer } from 'react-toastify';

import DriverCompleteRegistrationFormFields from '@/features/driver/components/driver-complete-registration-form-fields';
import CustomError from '@/shared/components/custom-error';
import CustomFormButton from '@/shared/components/custom-form-button';
import CustomFormWrapper from '@/shared/components/custom-form-wrapper';

import useDriverCompleteRegistrationForm from '@/features/driver/hooks/use-driver-complete-registration-form';
import useGetTokenPayload from '@/shared/hooks/use-get-token-payload';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver/enums/driver-complete-registration-form-keys';

import { TDriverCompleteRegistration } from '../../types';

const AddFaceRecognitionModal = dynamic(
  () => import('@/features/driver/components/add-facial-recognition-modal'),
  {
    ssr: false,
  },
);

const DriverCompleteRegistrationForm: FC<TDriverCompleteRegistration> = ({ token }) => {
  const tokenPayload = useGetTokenPayload({
    token,
    secretKey: process.env.NEXT_PUBLIC_REGISTER_DRIVER_TOKEN_SECRET_KEY,
  });

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
  } = useDriverCompleteRegistrationForm({
    tokenPayload,
  });

  const t = useTranslations('DriverCompleteRegistrationForm');

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
          <DriverCompleteRegistrationFormFields errors={errors} register={register} />
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
              error={errors?.[EDriverCompleteRegistrationFormKeys.FILE]?.message as string}
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

export default DriverCompleteRegistrationForm;
