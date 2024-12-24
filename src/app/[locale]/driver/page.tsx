import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import ContentWrapper from '@/shared/components/content-wrapper';
import DefaultLoader from '@/shared/components/default-loader';
import PageDescription from '@/shared/components/page-description';

const DriverRegisterForm = dynamic(
  () => import('@/features/driver/components/driver-register-form'),
  {
    loading: DefaultLoader,
  },
);

const DriverPage = () => {
  const t = useTranslations('DriverPage');

  return (
    <ContentWrapper>
      <PageDescription
        description={t('description')}
        secondaryDescription={t('secondaryDescription')}
      />
      <DriverRegisterForm />
    </ContentWrapper>
  );
};

export default DriverPage;
