import Image from 'next/image';
import { useTranslations } from 'next-intl';

import CustomFormWrapper from '@/shared/components/custom-form-wrapper';
import CustomInput from '@/shared/components/custom-input';

import { POLISH_NUMBER_PREFIX } from '../../consts/phone-number-prefixes';
import CitySelect from '../city-select';

const DriverRegisterForm = () => {
  const t = useTranslations('DriverRegisterForm');

  return (
    <CustomFormWrapper title={t('header')}>
      <form className='mt-4 space-y-6'>
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
          <button
            type='submit'
            className='w-full flex justify-center bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300'
          >
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

export default DriverRegisterForm;
