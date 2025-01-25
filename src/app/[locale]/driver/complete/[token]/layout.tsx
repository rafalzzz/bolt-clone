import { getTranslations, setRequestLocale } from 'next-intl/server';

import ContentWrapper from '@/shared/components/content-wrapper';

import { TFCWithChildren } from '@/shared/types/fc-with-children';
import { TLayoutParamsPromise } from '@/shared/types/locale-params-promise';

export async function generateMetadata({ params }: TLayoutParamsPromise) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'DriverCompletePageHeadSection',
  });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

const DriverPageLayout: TFCWithChildren<TLayoutParamsPromise> = async ({ children, params }) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <ContentWrapper>{children}</ContentWrapper>;
};

export default DriverPageLayout;
