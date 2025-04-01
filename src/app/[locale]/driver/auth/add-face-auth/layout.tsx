import { getTranslations, setRequestLocale } from 'next-intl/server';

import ContentWrapper from '@/shared/components/content-wrapper';

import { routing } from '@/i18n/routing';

import { TFCWithChildren } from '@/shared/types/fc-with-children';
import { TLayoutParamsPromise } from '@/shared/types/locale-params-promise';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: TLayoutParamsPromise) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'AddFaceAuthPageHeadSection' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

const AddFaceAuthPageLayout: TFCWithChildren<TLayoutParamsPromise> = async ({
  children,
  params,
}) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <ContentWrapper>{children}</ContentWrapper>;
};

export default AddFaceAuthPageLayout;
