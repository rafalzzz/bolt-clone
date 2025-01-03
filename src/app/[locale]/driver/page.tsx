import dynamic from 'next/dynamic';

import DefaultLoader from '@/shared/components/default-loader';

const InitialDriverRegistration = dynamic(
  () => import('@/features/driver/components/initial-driver-registration'),
  {
    loading: DefaultLoader,
  },
);

const DriverPage = async () => <InitialDriverRegistration />;

export default DriverPage;
