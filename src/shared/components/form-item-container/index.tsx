import CustomError from '@/shared/components/custom-error';

import { TFCWithChildren } from '@/shared/types/fc-with-children';

type TFormItemContainer = {
  inputKey: string;
  error?: string;
};

const FormItemContainer: TFCWithChildren<TFormItemContainer> = ({ error, inputKey, children }) => (
  <div className='mb-2'>
    <>{children}</>
    <CustomError inputKey={inputKey} error={error} />
  </div>
);

export default FormItemContainer;
