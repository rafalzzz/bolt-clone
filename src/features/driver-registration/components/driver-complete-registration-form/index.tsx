'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { ToastContainer } from 'react-toastify';

import CustomFormButton from '@/shared/components/custom-form-button';
import CustomFormFields from '@/shared/components/custom-form-fields';
import CustomFormWrapper from '@/shared/components/custom-form-wrapper';

import useDriverCompleteRegistrationForm from '@/features/driver-registration/hooks/use-driver-complete-registration-form';

import {
  DRIVER_REGISTRATION_COMPLETE_PAGE_FORM,
  DRIVER_REGISTRATION_COMPLETE_PAGE_FORM_SUBMIT_BUTTON,
} from '@/test-ids/driver-registration-complete-page';

import { TDriverCompleteRegistration } from '@/features/driver-registration/types';

const DriverCompleteRegistrationForm: FC<TDriverCompleteRegistration> = ({ tokenPayload }) => {
  const {
    state: { isLoading },
    formFields,
    onSubmit,
    handleSubmit,
  } = useDriverCompleteRegistrationForm({
    tokenPayload,
  });

  const t = useTranslations('DriverCompleteRegistrationForm');

  return (
    <>
      <ToastContainer />
      <CustomFormWrapper title={t('header')} testId={DRIVER_REGISTRATION_COMPLETE_PAGE_FORM}>
        <form className='mt-4 space-y-6' onSubmit={handleSubmit(onSubmit)} noValidate>
          <CustomFormFields formFields={formFields} />
          <div>
            <CustomFormButton
              text={t('submitButtonText')}
              isLoading={isLoading}
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
