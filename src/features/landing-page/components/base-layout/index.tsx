import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';

import Navbar from '@/features/navbar';

type TBaseLayout = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({ locale, children }: TBaseLayout) {
  const messages = await getMessages();

  return (
    <html className='h-full' lang={locale}>
      <body className={`antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
