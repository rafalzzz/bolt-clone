import { getTranslations, setRequestLocale } from 'next-intl/server';

import ContentWrapper from '@/shared/components/content-wrapper';

import { TFCWithChildren } from '@/shared/types/fc-with-children';
import { TLayoutParamsPromise } from '@/shared/types/locale-params-promise';

export async function generateMetadata({ params }: TLayoutParamsPromise) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'DriverRegistrationPageHeadSection' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

const ClientPageLayout: TFCWithChildren<TLayoutParamsPromise> = async ({ children, params }) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <ContentWrapper>{children}</ContentWrapper>;
};

export default ClientPageLayout;
