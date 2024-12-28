'use server';

import { registerDriverSchema } from '@/features/driver/schemas/register-driver-schema';

export async function registerDriverAction(cityOption: string, formData: FormData) {
  const data = Object.fromEntries(formData);
  const result = registerDriverSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.formErrors,
    };
  }
}
