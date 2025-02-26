'use server';

import type { NextApiRequest, NextApiResponse } from 'next';

import CompleteRegistrationEmailTemplate from '@/features/driver/components/complete-registration-email-template';

import { generateDriverRegistrationToken } from '@/features/driver/utils/generate-driver-registration-token';
import getErrorMessage from '@/shared/utils/common/get-error-message';
import { sendEmail } from '@/shared/utils/server-side/email';
import encryptSensitiveData from '@/shared/utils/server-side/encrypt-sensitive-data';

import { TDriverRegistrationFormSchema } from '@/features/driver/schemas/driver-registration-form-schema';

import { METHOD_NOT_ALLOWED } from '@/shared/consts/response-messages';

import { EDriverRegistrationFormKeys } from '@/features/driver/enums/driver-registration-form-keys';

import { TDriverRegistrationTokenPayload } from '@/features/driver/types';

import { TApiResponse } from '@/shared/types/api-response';

const keysToEncrypt = [EDriverRegistrationFormKeys.PHONE_NUMBER];
const keysToOmit = [EDriverRegistrationFormKeys.RULES];

const EMAIL_TITLE = 'Welcome to BoltCopy!';

export default async function POST(
  { method, body: data }: NextApiRequest,
  res: NextApiResponse<TApiResponse>,
) {
  if (method !== 'POST') {
    return res.status(405).json({ message: METHOD_NOT_ALLOWED });
  }

  try {
    const encryptedData = encryptSensitiveData<
      TDriverRegistrationFormSchema,
      TDriverRegistrationTokenPayload
    >({ data, keysToEncrypt, keysToOmit });

    const token = await generateDriverRegistrationToken(encryptedData);

    const { email: to } = data;

    const { error } = await sendEmail({
      to,
      subject: EMAIL_TITLE,
      emailTemplate: <CompleteRegistrationEmailTemplate token={token} />,
    });

    if (error) {
      const { message } = error;
      res.status(500).json({ message });
    }

    res.status(200).end();
  } catch (error: unknown) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
}
