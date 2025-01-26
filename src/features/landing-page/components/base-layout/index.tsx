import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { FC, ReactNode } from 'react';

import Navbar from '@/features/navbar/components/navbar';

import getServerCookie from '@/shared/utils/server-side/cookies';

import { THEME } from '@/shared/consts/cookie-names';

import { ETheme } from '@/shared/enums/theme';

type TBaseLayout = {
  children: ReactNode;
  locale: string;
};

const BaseLayout: FC<TBaseLayout> = async ({ locale, children }) => {
  const messages = await getMessages();

  const themeCookie = await getServerCookie(THEME);
  const themeValue = themeCookie?.value ?? '';
  const isThemeDefined = Object.keys(ETheme).includes(themeValue);
  const themeClassName = isThemeDefined ? themeValue : ETheme.LIGHT;

  return (
    <html className={`h-full ${themeClassName}`} lang={locale}>
      <body className='antialiased bg-backgroundColor dark:bg-backgroundColor transition'>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default BaseLayout;
