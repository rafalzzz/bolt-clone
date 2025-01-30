import type { FC } from 'react';

type TPageDescription = {
  description: string;
  secondaryDescription: string;
  testId?: string;
};

const PageDescription: FC<TPageDescription> = ({ description, secondaryDescription, testId }) => (
  <div className='custom-padding flex lg:w-2/3 text-textColor transition' data-testid={testId}>
    <div className='w-full flex flex-col items-start max-w-[600px] lg:space-y-6 lg:max-w-[360px] py-20'>
      <h1 className='font-bold font-sans w-1/2 lg:leading-tight text-3xl lg:w-full lg:text-6xl'>
        {description}
      </h1>
      <p className='mt-1 font-sans w-1/2 lg:text-lg lg:w-full'>{secondaryDescription}</p>
    </div>
  </div>
);

export default PageDescription;
