import dynamic from 'next/dynamic';

import ContentWrapper from '@/shared/components/content-wrapper';
import DefaultLoader from '@/shared/components/default-loader';

const InitialDriverRegistration = dynamic(
  () => import('@/features/driver/components/initial-driver-registration'),
  {
    loading: DefaultLoader,
  },
);

const DriverPage = () => (
  <ContentWrapper>
    <InitialDriverRegistration />
  </ContentWrapper>
);

export default DriverPage;
