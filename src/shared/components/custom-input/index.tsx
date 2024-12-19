import { FC, InputHTMLAttributes, ReactNode } from 'react';

import './custom-input.css';

type TCustomInput = {
  label: string;
  props: InputHTMLAttributes<HTMLInputElement>;
  prefix?: ReactNode;
};

const CustomInput: FC<TCustomInput> = ({ label, prefix, props }) => (
  <label className='text-sm font-bold text-gray-700 tracking-wide dark:text-white  transition'>
    {label}
    <div className='flex flex-row'>
      {prefix && (
        <span className='custom-input flex flex-row items-center justify-center rounded-md p-4 mr-4'>
          {prefix}
        </span>
      )}
      <input className='custom-input block w-full rounded-md bg-gray-50 p-4' {...props} />
    </div>
  </label>
);

export default CustomInput;
