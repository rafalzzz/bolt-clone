import { getTranslations } from 'next-intl/server';

import { routing } from '@/i18n/routing';

import { TFCWithChildren } from '@/shared/types/fc-with-children';
import { TLayoutParamsPromise } from '@/shared/types/locale-params-promise';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: TLayoutParamsPromise) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'DriverLoginPageHeadSection',
  });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

const DriverLoginPageLayout: TFCWithChildren = ({ children }) => children;

export default DriverLoginPageLayout;
