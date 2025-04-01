'use client';

import { useTranslations } from 'next-intl';
import { ToastContainer } from 'react-toastify';

import RedirectionToLoginPage from '@/features/driver-registration/components/redirection-to-login-page';
import CustomFormButton from '@/shared/components/custom-form-button';
import CustomFormFields from '@/shared/components/custom-form-fields';
import CustomFormWrapper from '@/shared/components/custom-form-wrapper';

import useDriverRegistrationForm from '@/features/driver-registration/hooks/use-driver-registration-form';

import {
  DRIVER_REGISTRATION_PAGE_FORM,
  DRIVER_REGISTRATION_PAGE_FORM_SUBMIT_BUTTON,
} from '@/test-ids/driver-registration-page';

const DriverRegistrationForm = () => {
  const {
    state: { isLoading, isSuccess },
    formFields,
    onSubmit,
    handleSubmit,
  } = useDriverRegistrationForm();

  const t = useTranslations('DriverRegistrationForm');

  return (
    <>
      <ToastContainer />
      <CustomFormWrapper title={t('header')} testId={DRIVER_REGISTRATION_PAGE_FORM}>
        <form className='mt-4 space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <CustomFormFields formFields={formFields} />
          <div>
            <CustomFormButton
              text={t('submitButtonText')}
              isLoading={isLoading}
              testId={DRIVER_REGISTRATION_PAGE_FORM_SUBMIT_BUTTON}
              buttonProps={{
                type: 'submit',
                disabled: isLoading || isSuccess,
              }}
            />
          </div>
          <RedirectionToLoginPage />
        </form>
      </CustomFormWrapper>
    </>
  );
};

export default DriverRegistrationForm;
