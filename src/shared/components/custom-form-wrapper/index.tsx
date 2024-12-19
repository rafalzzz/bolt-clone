import { FC, PropsWithChildren } from 'react';

type TCustomFormWrapper = {
  title: string;
};

const CustomFormWrapper: FC<PropsWithChildren<TCustomFormWrapper>> = ({ title, children }) => (
  <div className='flex w-full lg:w-1/2 justify-center items-center bg-white rounded-lg shadow-xl border border-gray-300 dark:bg-gray-900 dark:border-white transition'>
    <div className='relative flex items-center w-full mx-8'>
      <div className='w-full z-10'>
        <header className='text-left'>
          <h2 className='mt-2 text-3xl font-bold text-gray-700 dark:text-white transition'>
            {title}
          </h2>
        </header>
        {children}
      </div>
    </div>
  </div>
);

export default CustomFormWrapper;
