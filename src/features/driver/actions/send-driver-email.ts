'use server';

import {
  TSendDriverEmailSchema,
  sendDriverEmailSchema,
} from '@/features/driver/schemas/send-driver-email-schema';

export async function sendDriverEmail(_prevState: unknown, formData: FormData) {
  console.log({ formData });
  const data = Object.fromEntries(formData);
  const result = sendDriverEmailSchema.safeParse(data);

  if (!result.success) {
    return {
      data: data as TSendDriverEmailSchema,
      errors: result.error.formErrors,
    };
  }

  return {};
}
