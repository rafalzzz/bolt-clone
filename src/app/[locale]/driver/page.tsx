import dynamic from 'next/dynamic';

import DefaultLoader from '@/shared/components/default-loader';

const DriverRegistration = dynamic(
  () => import('@/features/driver-registration/components/driver-registration'),
  {
    loading: DefaultLoader,
  },
);

const DriverRegistrationPage = async () => <DriverRegistration />;

export default DriverRegistrationPage;
