import { FC } from 'react';

import CustomFormButton from '@/shared/components/custom-form-button';

import { TCustomButton } from '@/shared/types/custom-button-args';

const CustomCenteredButton: FC<TCustomButton> = ({
  additionalClassNames = 'max-w-[300px]',
  ...rest
}) => (
  <div className='flex justify-center items-center'>
    <CustomFormButton additionalClassNames={additionalClassNames} {...rest} />
  </div>
);

export default CustomCenteredButton;
