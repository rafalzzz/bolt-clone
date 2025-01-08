import dynamic from 'next/dynamic';

import DefaultLoader from '@/shared/components/default-loader';

const DriverCompleteRegistration = dynamic(
  () => import('@/features/driver/components/driver-complete-registration'),
  {
    loading: DefaultLoader,
  },
);

const CompleteDriverRegistrationPage = () => <DriverCompleteRegistration />;

export default CompleteDriverRegistrationPage;
