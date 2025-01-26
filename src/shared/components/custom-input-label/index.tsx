import { TFCWithChildren } from '@/shared/types/fc-with-children';

type TCustomInputLabel = {
  label: string;
};

const CustomInputLabel: TFCWithChildren<TCustomInputLabel> = ({ label, children }) => (
  <label className='text-sm font-bold tracking-wide text-textColor dark:text-textColor transition-all'>
    {label}
    <>{children}</>
  </label>
);

export default CustomInputLabel;
