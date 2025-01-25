'use server';

import CompleteRegistrationEmailTemplate from '@/features/driver/components/complete-registration-email-template';

import { sendEmail } from '@/shared/utils/server-side/email';

import type { TDriverRegisterFormSchema } from '@/features/driver/schemas/driver-register-form-schema';

import { generateDriverRegistrationToken } from './generate-driver-registration-token';

const EMAIL_TITLE = 'Welcome to BoltCopy!';

export async function sendEmailToDriver(formData: TDriverRegisterFormSchema) {
  try {
    const token = await generateDriverRegistrationToken(formData);

    const { error } = await sendEmail({
      email: formData.email,
      subject: EMAIL_TITLE,
      emailTemplate: <CompleteRegistrationEmailTemplate token={token} />,
    });

    if (!error) {
      return { isSuccess: true, error: false };
    }

    return { isSuccess: false, error };
  } catch (error: unknown) {
    return { isSuccess: true, error };
  }
}
