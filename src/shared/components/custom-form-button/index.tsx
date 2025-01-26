import type { ButtonHTMLAttributes, FC } from 'react';

import LoaderSvg from '@/shared/svg/loader-svg';

type TCustomFormButton = {
  text: string;
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
  isLoading?: boolean;
  additionalClassNames?: string;
};

const CustomFormButton: FC<TCustomFormButton> = ({
  text,
  buttonProps,
  isLoading = false,
  additionalClassNames = 'my-8',
}) => (
  <button
    className={
      'w-full p-4 flex justify-center font-semibold shadow-lg rounded-full tracking-wide cursor-pointer font-semibold primary-button ' +
      additionalClassNames
    }
    aria-label={text}
    {...buttonProps}
  >
    {text}
    {isLoading && (
      <LoaderSvg className='absolute ml-3 w-6 h-6 animate-spin text-secondaryColor fill-buttonTextColor right-[50px]' />
    )}
  </button>
);

export default CustomFormButton;
