import { InputHTMLAttributes, ReactNode } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';

import FormItemContainer from '@/shared/components/form-item-container';

import { TBasicFormType } from '@/shared/types/basic-form-type';

import './custom-checkbox.scss';

type TCustomCheckbox<FormType extends TBasicFormType> = {
  children: ReactNode;
  inputKey: Path<FormType>;
  register: UseFormRegister<FormType>;
  checkboxProps?: InputHTMLAttributes<HTMLInputElement>;
  error?: string;
};

const CustomCheckbox = <FormType extends TBasicFormType>({
  children,
  inputKey,
  register,
  checkboxProps,
  error,
}: TCustomCheckbox<FormType>) => (
  <FormItemContainer error={error}>
    <label className={`custom-checkbox custom-checkbox__${error ? 'invalid' : 'correct'}`}>
      <div className='custom-checkbox__container'>
        <div className='custom-checkbox__inner-container'>
          <input
            type='checkbox'
            className={`peer relative h-5 w-5 cursor-pointer appearance-none rounded-sm border transition-all custom-checkbox__input custom-checkbox__${error ? 'invalid' : 'correct'}-input`}
            {...checkboxProps}
            {...register(inputKey)}
          />
          <div className='custom-checkbox__svg-container'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3.5 w-3.5'
              viewBox='0 0 20 20'
              fill='currentColor'
              stroke='currentColor'
              strokeWidth='1'
            >
              <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
        </div>
      </div>
      {children}
    </label>
  </FormItemContainer>
);

export default CustomCheckbox;
