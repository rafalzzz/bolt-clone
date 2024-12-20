'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import CitySelect from '@/features/driver/components/city-select';
import CustomFormWrapper from '@/shared/components/custom-form-wrapper';
import CustomInput from '@/shared/components/custom-input';

import { POLISH_NUMBER_PREFIX } from '@/features/driver/consts/phone-number-prefixes';

import './driver-register-form.css';

const DriverRegisterForm = () => {
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
        <CitySelect />
        <div>
          <button type='submit' className='submit-button'>
            {t('submitButtonText')}
          </button>
        </div>
        {/* It will be used */}
        {/* <p className='flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500'>
        <span>Already have an account?</span>
        <a
          href='#'
          className='text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300'
        >
          Log in
        </a>
      </p> */}
      </form>
    </CustomFormWrapper>
  );
};

export default dynamic(() => Promise.resolve(DriverRegisterForm), { ssr: false });
