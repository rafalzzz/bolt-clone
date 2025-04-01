import dynamic from 'next/dynamic';

import DefaultLoader from '@/shared/components/default-loader';

const AddFaceAuth = dynamic(() => import('@/features/add-face-auth/components/add-face-auth'), {
  loading: DefaultLoader,
});

const AddFaceAuthPage = async () => <AddFaceAuth />;

export default AddFaceAuthPage;
