import dynamic from 'next/dynamic';

import DefaultLoader from '@/shared/components/default-loader';

import { TLayoutParamsPromise } from '@/shared/types/locale-params-promise';

const ClientLogin = dynamic(() => import('@/features/client-login/components/client-login'), {
  loading: DefaultLoader,
});

const ClientLoginPage: React.FC<TLayoutParamsPromise> = () => <ClientLogin />;

export default ClientLoginPage;
