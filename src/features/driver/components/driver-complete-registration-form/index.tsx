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

import {
  OPEN_ADD_FACIAL_RECOGNITION_MODAL_BUTTON,
  DRIVER_REGISTRATION_COMPLETE_PAGE_FORM,
  DRIVER_REGISTRATION_COMPLETE_PAGE_FORM_SUBMIT_BUTTON,
} from '@/test-ids/driver-registration-complete-page';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver/enums/driver-complete-registration-form-keys';

import { TDriverCompleteRegistration } from '../../types';

const AddFacialRecognitionModal = dynamic(
  () => import('@/features/driver/components/add-facial-recognition-modal'),
  {
    ssr: false,
  },
);

const DriverCompleteRegistrationForm: FC<TDriverCompleteRegistration> = ({ tokenPayload }) => {
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
        <AddFacialRecognitionModal
          isVisible={isAddFacialRecognitionModalEnabled}
          setIsAddFacialRecognitionModalEnabled={setIsAddFacialRecognitionModalEnabled}
          setValue={setValue}
          onOk={onOk}
          onCancel={onCancel}
        />
      )}
      <CustomFormWrapper title={t('header')} testId={DRIVER_REGISTRATION_COMPLETE_PAGE_FORM}>
        <form className='mt-4 space-y-6' onSubmit={handleSubmit(onSubmit)} noValidate>
          <DriverCompleteRegistrationFormFields errors={errors} register={register} />
          <div>
            <CustomFormButton
              text={t('addFaceImageButtonText')}
              additionalClassNames='mt-8'
              testId={OPEN_ADD_FACIAL_RECOGNITION_MODAL_BUTTON}
              buttonProps={{
                type: 'button',
                onClick: () => setIsAddFacialRecognitionModalEnabled((prevState) => !prevState),
              }}
            />
            <CustomError
              inputKey={EDriverCompleteRegistrationFormKeys.FILE}
              error={errors?.[EDriverCompleteRegistrationFormKeys.FILE]?.message as string}
            />
            <CustomFormButton
              text={t('submitButtonText')}
              testId={DRIVER_REGISTRATION_COMPLETE_PAGE_FORM_SUBMIT_BUTTON}
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
