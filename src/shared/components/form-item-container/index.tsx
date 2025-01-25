import CustomError from '@/shared/components/custom-error';

import { TFCWithChildren } from '@/shared/types/fc-with-children';

type TFormItemContainer = {
  error?: string;
};

const FormItemContainer: TFCWithChildren<TFormItemContainer> = ({ error, children }) => (
  <div className='mb-2'>
    <>{children}</>
    <CustomError error={error} />
  </div>
);

export default FormItemContainer;
