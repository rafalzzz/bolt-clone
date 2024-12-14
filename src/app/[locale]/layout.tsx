import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';

import BaseLayout from '@/features/landing-page/components/base-layout';

import { TLanguageValues } from '@/shared/consts/languages';

import { routing } from '@/i18n/routing';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
  const locale = params?.locale;

  if (!routing.locales.includes(locale as TLanguageValues)) {
    notFound();
  }

  await setRequestLocale(locale); // Obsługa lokalizacji na serwerze

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
