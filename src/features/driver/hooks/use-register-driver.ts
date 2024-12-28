import { useState } from 'react';

import { TOption } from '@/shared/types/react-select';

const useRegisterDriver = () => {
  const [cityOption, setCityOption] = useState<TOption | null>(null);

  return { cityOption, setCityOption };
};

export default useRegisterDriver;
