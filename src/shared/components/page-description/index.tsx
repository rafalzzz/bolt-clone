import { FC } from 'react';

import '@/styles/globals.css';

type TPageDescription = {
  description: string;
  secondaryDescription: string;
};

const PageDescription: FC<TPageDescription> = ({ description, secondaryDescription }) => (
  <div className='flex w-full lg:w-2/3 items-center mx-auto px-0 sm:px-6 lg:px-0 text-gray-700 dark:text-white'>
    <div className='w-full mx-auto flex flex-col items-start lg:space-y-6 lg:pr-40 lg:px-0 py-20'>
      <h1 className='font-bold font-sans w-1/2 lg:leading-tight text-3xl lg:w-full lg:text-6xl'>
        {description}
      </h1>
      <p className='mt-1 font-sans w-1/2 lg:text-lg lg:w-full'>{secondaryDescription}</p>
    </div>
  </div>
);

export default PageDescription;
