import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';

import getServerCookie from '@/shared/utils/server-side/cookies';

import { DARK_MODE } from '@/shared/consts/cookie-names';
import { DARK } from '@/shared/consts/theme-class-names';

import { EDarkMode } from '@/shared/enums/cookie-values';

import Navbar from '@/features/navbar';

type TBaseLayout = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({ locale, children }: TBaseLayout) {
  const messages = await getMessages();

  const darkModeCookie = await getServerCookie(DARK_MODE);
  const isDarkModeEnabled = darkModeCookie?.value === EDarkMode.ENABLED;

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
