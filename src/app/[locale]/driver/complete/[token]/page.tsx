import dynamic from 'next/dynamic';

import DefaultLoader from '@/shared/components/default-loader';

import { TLayoutParamsPromise } from '@/shared/types/locale-params-promise';

const DriverCompleteRegistration = dynamic(
  () => import('@/features/driver/components/driver-complete-registration'),
  {
    loading: DefaultLoader,
  },
);

const CompleteDriverRegistrationPage: React.FC<TLayoutParamsPromise> = async ({ params }) => {
  const { token } = await params;

  console.log({ token });

  return <DriverCompleteRegistration token={token} />;
};

export default CompleteDriverRegistrationPage;
