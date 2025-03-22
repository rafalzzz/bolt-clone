import dynamic from 'next/dynamic';

import DefaultLoader from '@/shared/components/default-loader';

const AddCar = dynamic(() => import('@/features/add-car/components/add-car'), {
  loading: DefaultLoader,
});

const AddCarPage = async () => <AddCar />;

export default AddCarPage;
