import { FC, PropsWithChildren } from 'react';

import './content-wrapper.scss';

const ContentWrapper: FC<PropsWithChildren> = ({ children }) => (
  <main className='content-wrapper'>
    <div className='content-wrapper__container'>{children}</div>
  </main>
);

export default ContentWrapper;
