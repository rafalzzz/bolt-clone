import { FC, InputHTMLAttributes, ReactNode } from 'react';

import DefaultErrorIcon from '../default-error-icon';

import './custom-input.scss';

type TCustomInput = {
  label: string;
  props: InputHTMLAttributes<HTMLInputElement>;
  error?: string;
  prefix?: ReactNode;
};

const CustomInput: FC<TCustomInput> = ({ label, props, error, prefix }) => (
  <label className='custom-input'>
    {label}
    <div className='custom-input__input-container'>
      {prefix && <span className='custom-input__input custom-input__input-prefix'>{prefix}</span>}
      <input
        className={`custom-input__input custom-input__${error ? 'invalid' : 'correct'}-input`}
        {...props}
      />
      {error && (
        <div className='custom-input__error-icon'>
          <DefaultErrorIcon />
        </div>
      )}
    </div>
  </label>
);

export default CustomInput;
