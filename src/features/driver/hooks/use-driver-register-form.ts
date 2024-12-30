import { useActionState } from 'react';

import { sendDriverEmail } from '@/features/driver/actions/send-driver-email';

import {
  TSendDriverEmailSchema,
  TSendDriverEmailSchemaError,
} from '@/features/driver/schemas/send-driver-email-schema';

const useDriverRegisterForm = () => {
  const initialState = {
    data: {} as TSendDriverEmailSchema,
    errors: {} as TSendDriverEmailSchemaError,
  };

  const [state, registerDriverAction] = useActionState(sendDriverEmail, initialState);

  console.log('useDriverRegisterForm', { state });

  return { registerDriverAction };
};

export default useDriverRegisterForm;
