import { FC, PropsWithChildren } from 'react';

import './custom-form-wrapper.css';

type TCustomFormWrapper = {
  title: string;
};

const CustomFormWrapper: FC<PropsWithChildren<TCustomFormWrapper>> = ({ title, children }) => (
  <section className='custom-form-wraper'>
    <div className='custom-form-wraper__inner-container'>
      <div className='custom-form-wraper__header-wrapper'>
        <header>
          <h2 className='custom-form-wraper__header'>{title}</h2>
        </header>
        {children}
      </div>
    </div>
  </section>
);

export default CustomFormWrapper;
