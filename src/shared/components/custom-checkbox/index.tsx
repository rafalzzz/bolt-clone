import type { InputHTMLAttributes } from 'react';
import type { Path, UseFormRegister } from 'react-hook-form';

import FormItemContainer from '@/shared/components/form-item-container';

import getCheckboxTestId from '@/test-helpers/get-checkbox-test-id';

import { TBasicFormType } from '@/shared/types/basic-form-type';

import './custom-checkbox.scss';

export type TCustomCheckbox<FormType extends TBasicFormType> = {
  inputKey: Path<FormType>;
  text: string;
  register: UseFormRegister<FormType>;
  checkboxProps?: InputHTMLAttributes<HTMLInputElement>;
  error?: string;
};

const CustomCheckbox = <FormType extends TBasicFormType>({
  inputKey,
  text,
  register,
  checkboxProps,
  error,
}: TCustomCheckbox<FormType>) => (
  <FormItemContainer inputKey={inputKey} error={error}>
    <label
      htmlFor={inputKey}
      data-testid={getCheckboxTestId(inputKey)}
      className={`flex text-xs text-justify mt-3 transition-all custom-checkbox__${error ? 'invalid' : 'correct'}`}
    >
      <div className='inline-flex items-center'>
        <div className='relative flex cursor-pointer items-center rounded-full p-0 mr-3'>
          <input
            id={inputKey}
            type='checkbox'
            className={`peer relative h-5 w-5 cursor-pointer appearance-none rounded-sm border transition-all before:bg-primaryColor checked:border-primaryColor checked:bg-primaryColor checked:before:bg-primaryColor custom-checkbox__${error ? 'invalid' : 'correct'}-input`}
            {...checkboxProps}
            {...register(inputKey)}
          />
          <div className='absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-buttonTextColor opacity-0 peer-checked:opacity-100'>
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
      {text}
    </label>
  </FormItemContainer>
);

export default CustomCheckbox;
