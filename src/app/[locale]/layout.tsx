import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { FC, PropsWithChildren } from 'react';

import BaseLayout from '@/features/landing-page/components/base-layout';

import { routing } from '@/i18n/routing';

type TLayoutLocale = {
  params: { locale: string };
};

const LocaleLayout: FC<PropsWithChildren<TLayoutLocale>> = async ({ children, params }) => {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
};

export default LocaleLayout;
