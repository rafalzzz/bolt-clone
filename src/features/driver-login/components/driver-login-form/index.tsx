'use client';

import { useTranslations } from 'next-intl';
import { ToastContainer } from 'react-toastify';

import RedirectionToRegistrationPage from '@/features/driver-login/components/redirection-to-registration-page';
import CustomFormButton from '@/shared/components/custom-form-button';
import CustomFormFields from '@/shared/components/custom-form-fields';
import CustomFormWrapper from '@/shared/components/custom-form-wrapper';

import useDriverLoginForm from '@/features/driver-login/hooks/use-driver-login-form';

import {
  DRIVER_LOGIN_PAGE_FORM,
  DRIVER_LOGIN_PAGE_FORM_SUBMIT_BUTTON,
} from '@/test-ids/driver-login-page';

const DriverLoginForm = () => {
  const {
    state: { isLoading },
    formFields,
    onSubmit,
    handleSubmit,
  } = useDriverLoginForm();

  const t = useTranslations('DriverLoginForm');

  return (
    <>
      <ToastContainer />
      <CustomFormWrapper title={t('header')} testId={DRIVER_LOGIN_PAGE_FORM}>
        <form className='mt-4 space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <CustomFormFields formFields={formFields} />
          <div>
            <CustomFormButton
              text={t('submitButtonText')}
              isLoading={isLoading}
              testId={DRIVER_LOGIN_PAGE_FORM_SUBMIT_BUTTON}
              buttonProps={{
                type: 'submit',
              }}
            />
          </div>
          <RedirectionToRegistrationPage />
        </form>
      </CustomFormWrapper>
    </>
  );
};

export default DriverLoginForm;
