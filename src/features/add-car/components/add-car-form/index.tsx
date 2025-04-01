'use client';

import { useTranslations } from 'next-intl';
import { ToastContainer } from 'react-toastify';

import CustomFormButton from '@/shared/components/custom-form-button';
import CustomFormFields from '@/shared/components/custom-form-fields';
import CustomFormWrapper from '@/shared/components/custom-form-wrapper';

import useAddCarFormFields from '@/features/add-car/hooks/use-add-car-form';

import { ADD_CAR_PAGE_FORM, ADD_CAR_PAGE_FORM_SUBMIT_BUTTON } from '@/test-ids/add-car-page';

const AddCarForm = () => {
  const {
    state: { isLoading },
    formFields,
    onSubmit,
    handleSubmit,
  } = useAddCarFormFields();

  const t = useTranslations('AddCarForm');

  return (
    <>
      <ToastContainer />
      <CustomFormWrapper title={t('header')} testId={ADD_CAR_PAGE_FORM}>
        <form className='mt-4 space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <CustomFormFields formFields={formFields} />
          <div>
            <CustomFormButton
              text={t('submitButtonText')}
              isLoading={isLoading}
              testId={ADD_CAR_PAGE_FORM_SUBMIT_BUTTON}
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

export default AddCarForm;
