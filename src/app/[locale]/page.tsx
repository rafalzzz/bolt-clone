import { Metadata } from 'next';

import { TRootLayout } from '@/shared/types/root-layout';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'This is the main page.',
};

const Index = async ({ children }: TRootLayout) => {
  return (
    <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>{children}</main>
  );
};

export default Index;
