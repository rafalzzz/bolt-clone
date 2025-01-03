import { getTranslations, setRequestLocale } from 'next-intl/server';
import { FC, PropsWithChildren } from 'react';

import ContentWrapper from '@/shared/components/content-wrapper';

import { routing } from '@/i18n/routing';

import { TLayoutParamsPromise } from '@/shared/types/locale-params-promise';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: TLayoutParamsPromise) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'DriverPage' });

  return {
    title: t('title'),
  };
}

const DriverPageLayout: FC<PropsWithChildren<TLayoutParamsPromise>> = async ({
  children,
  params,
}) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <ContentWrapper>{children}</ContentWrapper>;
};

export default DriverPageLayout;
