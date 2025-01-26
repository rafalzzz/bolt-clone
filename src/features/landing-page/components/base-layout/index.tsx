import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { FC, ReactNode } from 'react';

import Navbar from '@/features/navbar/components/navbar';

import getServerCookie from '@/shared/utils/server-side/cookies';

import { DARK_MODE } from '@/shared/consts/cookie-names';
import { DARK } from '@/shared/consts/theme-class-names';

import { EDarkMode } from '@/shared/enums/cookie-values';

type TBaseLayout = {
  children: ReactNode;
  locale: string;
};

const BaseLayout: FC<TBaseLayout> = async ({ locale, children }) => {
  const messages = await getMessages();

  const darkModeCookie = await getServerCookie(DARK_MODE);
  const isDarkModeEnabled = darkModeCookie?.value === EDarkMode.ENABLED;

  return (
    <html className={`h-full ${isDarkModeEnabled ? DARK : undefined}`} lang={locale}>
      <body className='antialiased bg-backgroundColor dark:bg-darkBackgroundColor transition'>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default BaseLayout;
