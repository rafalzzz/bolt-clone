import { FC, PropsWithChildren } from 'react';

import './custom-form-wrapper.css';

type TCustomFormWrapper = {
  title: string;
};

const CustomFormWrapper: FC<PropsWithChildren<TCustomFormWrapper>> = ({ title, children }) => (
  <div className='custom-form-wraper'>
    <div className='custom-form-wraper__inner-container'>
      <div className='w-full z-10'>
        <header className='text-left'>
          <h2 className='custom-form-wraper__header'>{title}</h2>
        </header>
        {children}
      </div>
    </div>
  </div>
);

export default CustomFormWrapper;
