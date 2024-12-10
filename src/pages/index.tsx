import { GetStaticPropsContext } from 'next';

import Navbar from '@/features/navbar';

import '@/styles/globals.css';

const Index = () => (
  <>
    <Navbar />
    <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'></main>
  </>
);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../public/locales/${locale}.json`)).default,
      locale,
    },
  };
}

export default Index;
