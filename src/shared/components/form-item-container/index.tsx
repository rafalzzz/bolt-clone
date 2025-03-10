import type { TranslationValues } from 'next-intl';

import CustomError from '@/shared/components/custom-error';

import { TFCWithChildren } from '@/shared/types/fc-with-children';

type TFormItemContainer = {
  inputKey: string;
  error?: string;
  errorValues?: TranslationValues;
};

const FormItemContainer: TFCWithChildren<TFormItemContainer> = ({
  error,
  errorValues,
  inputKey,
  children,
}) => (
  <div className='mb-2'>
    <>{children}</>
    <CustomError inputKey={inputKey} error={error} errorValues={errorValues} />
  </div>
);

export default FormItemContainer;
