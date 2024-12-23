import { FC, PropsWithChildren } from 'react';

import './custom-form-wrapper.scss';

type TCustomFormWrapper = {
  title: string;
};

const CustomFormWrapper: FC<PropsWithChildren<TCustomFormWrapper>> = ({ title, children }) => (
  <section className='custom-form-wrapper'>
    <div className='custom-form-wrapper__inner-container custom-padding'>
      <div className='custom-form-wrapper__header-wrapper'>
        <header>
          <h2 className='custom-form-wrapper__header'>{title}</h2>
        </header>
        {children}
      </div>
    </div>
  </section>
);

export default CustomFormWrapper;
