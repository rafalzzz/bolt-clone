import dynamic from 'next/dynamic';

import DefaultLoader from '@/shared/components/default-loader';

import { decryptJwtToken } from '@/shared/utils/server-side/json-web-token';
import { encodeSecretKey } from '@/shared/utils/server-side/secret-key';

import { TDriverRegistrationTokenPayload } from '@/features/driver-registration/types/driver-registration';
import { TLayoutParamsPromise } from '@/shared/types/locale-params-promise';

const DriverCompleteRegistration = dynamic(
  () => import('@/features/driver-registration/components/driver-complete-registration'),
  {
    loading: DefaultLoader,
  },
);

const secretKey = process.env.NEXT_PUBLIC_REGISTER_DRIVER_TOKEN_SECRET_KEY;

const CompleteDriverRegistrationPage: React.FC<TLayoutParamsPromise> = async ({ params }) => {
  const { token } = await params;

  const tokenPayload = await decryptJwtToken({
    token,
    secretKey: encodeSecretKey(secretKey ?? ''),
  });

  return (
    <DriverCompleteRegistration tokenPayload={tokenPayload as TDriverRegistrationTokenPayload} />
  );
};

export default CompleteDriverRegistrationPage;
