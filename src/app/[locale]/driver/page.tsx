import dynamic from 'next/dynamic';

import DefaultLoader from '@/shared/components/default-loader';

const DriverRegistration = dynamic(
  () => import('@/features/driver/components/driver-registration'),
  {
    loading: DefaultLoader,
  },
);

const DriverPage = async () => <DriverRegistration />;

export default DriverPage;
