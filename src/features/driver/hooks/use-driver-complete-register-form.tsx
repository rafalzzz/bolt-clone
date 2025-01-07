import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  TDriverCompleteRegisterFormSchema,
  driverCompleteRegisterFormSchema,
} from '@/features/driver/schemas/driver-complete-register-form-schema';

const useDriverCompleteRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TDriverCompleteRegisterFormSchema>({
    resolver: zodResolver(driverCompleteRegisterFormSchema),
  });

  const onSubmit: SubmitHandler<TDriverCompleteRegisterFormSchema> = async (data) => {
    // TODO - finish driver registration
  };

  return { errors, register, onSubmit, handleSubmit };
};

export default useDriverCompleteRegisterForm;
