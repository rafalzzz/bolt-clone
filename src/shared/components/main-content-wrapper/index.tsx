import { FC, PropsWithChildren } from 'react';

const MainContentWrapper: FC<PropsWithChildren> = ({ children }) => (
  <main className='flex flex-wrap items-center justify-center mx-auto w-full p-0 max-w-5xl py-3'>
    {children}
  </main>
);

export default MainContentWrapper;
