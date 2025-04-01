import type { FC } from 'react';

type TCenteredPageDescription = {
  description: string;
  secondaryDescription: string;
  testId?: string;
};

const CenteredPageDescription: FC<TCenteredPageDescription> = ({
  description,
  secondaryDescription,
  testId,
}) => (
  <div
    className='custom-padding flex justify-center items-center text-textColor transition'
    data-testid={testId}
  >
    <div className='w-full flex flex-col items-center md:space-y-6 py-20'>
      <h1 className='font-bold font-sans w-full lg:leading-tight text-3xl md:text-6xl text-center'>
        {description}
      </h1>
      <p className='mt-1 font-sans w-full lg:text-lg text-center'>{secondaryDescription}</p>
    </div>
  </div>
);

export default CenteredPageDescription;
