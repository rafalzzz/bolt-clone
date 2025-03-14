import type { ButtonHTMLAttributes, FC } from 'react';

import getLoaderTestId from '@/test-helpers/get-loader-test-id';

import LoaderSvg from '@/shared/svg/loader-svg';

type TCustomFormButton = {
  text: string;
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
  testId?: string;
  isLoading?: boolean;
  additionalClassNames?: string;
};

const CustomFormButton: FC<TCustomFormButton> = ({
  text,
  buttonProps,
  testId = '',
  isLoading = false,
  additionalClassNames = 'my-8',
}) => (
  <button
    className={
      'w-full p-4 flex justify-center font-semibold shadow-lg rounded-full tracking-wide cursor-pointer font-semibold primary-button ' +
      additionalClassNames
    }
    aria-label={text}
    data-testid={testId}
    {...buttonProps}
  >
    {text}
    {isLoading && (
      <LoaderSvg
        data-testid={getLoaderTestId(testId)}
        className='absolute ml-3 w-6 h-6 animate-spin text-secondaryColor fill-buttonTextColor right-[50px]'
      />
    )}
  </button>
);

export default CustomFormButton;
