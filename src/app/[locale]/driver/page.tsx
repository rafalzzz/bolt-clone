import { useTranslations } from 'next-intl';

import CustomInput from '@/shared/components/custom-input';
import PageDescription from '@/shared/components/page-description';

const DriverPage = () => {
  const t = useTranslations('DriverPage');

  return (
    <main className='flex flex-wrap items-center justify-center mx-auto w-full p-0 max-w-5xl py-3 lg:px-6'>
      <div className='h-auto w-full flex p-0 lg:flex-row flex-col'>
        <PageDescription
          description={t('description')}
          secondaryDescription={t('secondaryDescription')}
        />
        <div className='flex w-full lg:w-1/2 justify-center items-center bg-white rounded-lg dark:bg-gray-900 transition'>
          <div className='relative flex items-center w-full mx-8'>
            <div className='w-full z-10'>
              <header className='text-left'>
                <h2 className='mt-2 text-3xl font-bold text-gray-700'>Become a driver</h2>
              </header>
              <form className='mt-8 space-y-6' action='#' method='POST'>
                <CustomInput label='Email' props={{ placeholder: 'Enter email address' }} />
                <div className='mt-8 content-center'>
                  <label className='text-sm font-bold text-gray-700 tracking-wide'>Password</label>
                  <input
                    className='w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                    type=''
                    placeholder='Enter your password'
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <input
                      id='remember_me'
                      name='remember_me'
                      type='checkbox'
                      className='h-4 w-4 bg-indigo-500 focus:ring-indigo-400 border-gray-300 rounded'
                    />
                    <label className='ml-2 block text-sm text-gray-900'>Remember me</label>
                  </div>
                  <div className='text-sm'>
                    <a href='#' className='font-medium text-indigo-500 hover:text-indigo-500'>
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type='submit'
                    className='w-full flex justify-center bg-indigo-500 text-gray-100 p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300'
                  >
                    Sign in
                  </button>
                </div>
                <p className='flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500'>
                  <span>Don&apos;t have an account?</span>
                  <a
                    href='#'
                    className='text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300'
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DriverPage;
