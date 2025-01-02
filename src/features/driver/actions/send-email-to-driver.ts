'use server';

import { sendEmail } from '@/shared/actions/send-email';

import { TDriverRegisterFormSchema } from '../schemas/driver-register-form-schema';

export async function sendEmailToDriver(formData: TDriverRegisterFormSchema) {
  const { email } = formData;

  return await sendEmail({ email, subject: 'Test', html: 'Test' });
}
