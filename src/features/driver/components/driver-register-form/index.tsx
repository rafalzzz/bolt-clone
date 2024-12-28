'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import CitySelect from '@/features/driver/components/city-select';
import RedirectionToLoginPage from '@/features/driver/components/redirection-to-login-page';
import CustomCheckbox from '@/shared/components/custom-checkbox';
import CustomFormWrapper from '@/shared/components/custom-form-wrapper';
import CustomInput from '@/shared/components/custom-input';

import useRegisterDriver from '@/features/driver/hooks/use-register-driver';

import { POLISH_NUMBER_PREFIX } from '@/features/driver/consts/phone-number-prefixes';

import './driver-register-form.scss';

const DriverRegisterForm = () => {
  /* const [state, registerDriver] = useActionState(); */
  const { cityOption, setCityOption } = useRegisterDriver();

  const t = useTranslations('DriverRegisterForm');

  return (
    <CustomFormWrapper title={t('header')}>
      <form className='driver-register-form'>
        <CustomInput label='Email' props={{ placeholder: t('emailPlaceholder') }} />
        <CustomInput
          label={t('phoneNumberLabel')}
          prefix={
            <>
              <Image
                className='mr-1'
                alt='pl'
                title='pl'
                width={24}
                height={24}
                src='https://hatscripts.github.io/circle-flags/flags/pl.svg'
              />
              {POLISH_NUMBER_PREFIX}
            </>
          }
          props={{ placeholder: t('phoneNumberPlaceholder') }}
        />
        <CitySelect cityOption={cityOption} setCityOption={setCityOption} />
        <CustomCheckbox>{t('termsText')}</CustomCheckbox>
        <div>
          <button
            type='submit'
            className='driver-register-form__submit-button default-button-colors '
          >
            {t('submitButtonText')}
          </button>
        </div>
        <RedirectionToLoginPage />
      </form>
    </CustomFormWrapper>
  );
};

export default DriverRegisterForm;
