import { FC, PropsWithChildren } from 'react';

import './main-content-wrapper.scss';

const MainContentWrapper: FC<PropsWithChildren> = ({ children }) => (
  <main className='main-content-wrapper'>{children}</main>
);

export default MainContentWrapper;
