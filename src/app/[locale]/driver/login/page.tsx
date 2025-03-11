import dynamic from 'next/dynamic';

import DefaultLoader from '@/shared/components/default-loader';

import { TLayoutParamsPromise } from '@/shared/types/locale-params-promise';

const DriverLogin = dynamic(() => import('@/features/driver-login/components/driver-login'), {
  loading: DefaultLoader,
});

const DriverLoginPage: React.FC<TLayoutParamsPromise> = () => <DriverLogin />;

export default DriverLoginPage;
