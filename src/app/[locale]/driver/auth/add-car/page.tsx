import dynamic from 'next/dynamic';

import { createClient } from '@/lib/supabase/server-client';

import DefaultLoader from '@/shared/components/default-loader';

const AddCar = dynamic(() => import('@/features/add-car/components/add-car'), {
  loading: DefaultLoader,
});

const AddCarPage = async () => {
  const { supabase } = await createClient();

  const { data, error } = await supabase.auth.getUser();

  console.log({ data });

  if (error || !data?.user) {
    console.log({ error });
  }

  return <AddCar />;
};

export default AddCarPage;
