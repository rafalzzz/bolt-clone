import { InputHTMLAttributes } from 'react';

import './custom-input.css';

type TCustomInput = {
  label: string;
  props: InputHTMLAttributes<HTMLInputElement>;
};

const CustomInput = ({ label, props }: TCustomInput) => (
  <label className='text-sm font-bold text-gray-700 tracking-wide'>
    {label}
    <input
      className='custom-input block w-full rounded-md bg-gray-50 p-4 text-md text-gray-700'
      type=''
      {...props}
    />
  </label>
);

export default CustomInput;
