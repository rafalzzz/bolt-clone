import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';

import BaseLayout from '@/features/landing-page/components/base-layout';

import { DARK_MODE } from '@/shared/consts/cookie-names';

import { EDarkMode } from '@/shared/enums/cookie-values';

import { routing } from '@/i18n/routing';

type TLayoutLocale = {
  children: ReactNode;
  params: { locale: string };
};

const LocaleLayout = async ({ children, params }: TLayoutLocale) => {
  /* @next-codemod-ignore */
  const locale = await params.locale;

  const cookieStore = await cookies();
  const isDarkModeEnabled = cookieStore.get(DARK_MODE)?.value === EDarkMode.ENABLED;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <BaseLayout locale={locale} isDarkModeEnabled={isDarkModeEnabled}>
      {children}
    </BaseLayout>
  );
};

export default LocaleLayout;
