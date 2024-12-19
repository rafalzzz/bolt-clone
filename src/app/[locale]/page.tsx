import { Metadata } from 'next';

import { TRootLayout } from '@/shared/types/root-layout';

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'This is the main page.',
};

const Index = async ({ children }: TRootLayout) => {
  return children;
};

export default Index;
