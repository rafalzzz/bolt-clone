import { getTranslations } from 'next-intl/server';

import { TFCWithChildren } from '@/shared/types/fc-with-children';
import { TLayoutParamsPromise } from '@/shared/types/locale-params-promise';

export async function generateMetadata({ params }: TLayoutParamsPromise) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'DriverRegistrationCompletePageHeadSection',
  });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

const DriverRegistrationPageLayout: TFCWithChildren = ({ children }) => children;

export default DriverRegistrationPageLayout;
