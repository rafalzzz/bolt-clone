'use server';

import CompleteRegistrationEmailTemplate from '@/features/driver/components/complete-registration-email-template';

import { sendEmail } from '@/shared/utils/server-side/email';
import encryptSensitiveData from '@/shared/utils/server-side/encrypt-sensitive-data';
import throwError from '@/shared/utils/server-side/throw-error';

import type { TDriverRegistrationFormSchema } from '@/features/driver/schemas/driver-registration-form-schema';

import { EDriverRegistrationFormKeys } from '@/features/driver/enums/driver-registration-form-keys';

import { TDriverRegistrationTokenPayload } from '@/features/driver/types';

import { generateDriverRegistrationToken } from './generate-driver-registration-token';

const EMAIL_TITLE = 'Welcome to BoltCopy!';

const keysToEcrypt = [EDriverRegistrationFormKeys.PHONE_NUMBER];
const keysToOmit = [EDriverRegistrationFormKeys.RULES];

export async function sendEmailToDriver(data: TDriverRegistrationFormSchema) {
  try {
    const encryptedData = encryptSensitiveData<
      TDriverRegistrationFormSchema,
      TDriverRegistrationTokenPayload
    >({ data, keysToEcrypt, keysToOmit });

    const token = await generateDriverRegistrationToken(encryptedData);

    const { email: to } = data;

    const { error } = await sendEmail({
      to,
      subject: EMAIL_TITLE,
      emailTemplate: <CompleteRegistrationEmailTemplate token={token} />,
    });

    if (error) {
      throwError(error);
    }
  } catch (error: unknown) {
    throwError(error);
  }
}
