import { Metadata } from 'next';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'This is the main page.',
};

const Index = async () => {
  return (
    <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
      <h1>Test</h1>
    </main>
  );
};

export default Index;
