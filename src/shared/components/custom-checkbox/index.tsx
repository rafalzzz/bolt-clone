import { FC, PropsWithChildren } from 'react';

import './custom-checkbox.css';

const CustomCheckbox: FC<PropsWithChildren> = ({ children }) => (
  <label className='custom-checkbox'>
    <div className='custom-checkbox__container'>
      <div className='custom-checkbox__inner-container'>
        <input
          type='checkbox'
          className='peer relative h-5 w-5 cursor-pointer appearance-none rounded-sm border transition-all custom-checkbox__input'
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
);

export default CustomCheckbox;
