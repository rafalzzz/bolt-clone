import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';

import { DARK } from '@/shared/consts/theme-class-names';

import Navbar from '@/features/navbar';

type TBaseLayout = {
  children: ReactNode;
  locale: string;
  isDarkModeEnabled: boolean;
};

export default async function BaseLayout({ locale, isDarkModeEnabled, children }: TBaseLayout) {
  const messages = await getMessages();

  return (
    <html className={`h-full ${isDarkModeEnabled ? DARK : undefined}`} lang={locale}>
      <body className={`antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
