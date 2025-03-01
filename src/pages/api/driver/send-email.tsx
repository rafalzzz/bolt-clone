'use server';

import type { NextApiRequest, NextApiResponse } from 'next';

import CustomResponseError from '@/shared/classes/custom-response-error';

import { generateDriverRegistrationToken } from '@/features/driver/utils/generate-driver-registration-token';
import handleUniqueColumnsCheck from '@/features/driver/utils/handle-unique-columns-check';
import sendDriverRegistrationEmail from '@/features/driver/utils/send-driver-registration-email';
import createHash from '@/shared/utils/server-side/create-hash';
import encryptSensitiveData from '@/shared/utils/server-side/encrypt-sensitive-data';
import handleRequestError from '@/shared/utils/server-side/handle-request-error';

import { TDriverRegistrationFormSchema } from '@/features/driver/schemas/driver-registration-form-schema';

import { METHOD_NOT_ALLOWED } from '@/shared/consts/response-messages';

import { EDriverRegistrationFormKeys } from '@/features/driver/enums/driver-registration-form-keys';

import { TDriverRegistrationTokenPayload } from '@/features/driver/types';

import { TApiResponse } from '@/shared/types/api-response';

const keysToEncrypt = [EDriverRegistrationFormKeys.PHONE_NUMBER];
const keysToOmit = [EDriverRegistrationFormKeys.RULES];

export default async function POST(
  { method, body: data }: NextApiRequest,
  res: NextApiResponse<TApiResponse>,
) {
  if (method !== 'POST') {
    throw new CustomResponseError(405, METHOD_NOT_ALLOWED);
  }

  const { email, phoneNumber } = data;

  const phoneNumberHash = createHash(String(phoneNumber));

  try {
    await handleUniqueColumnsCheck(phoneNumberHash, email);

    const encryptedData = encryptSensitiveData<
      TDriverRegistrationFormSchema,
      TDriverRegistrationTokenPayload
    >({ data, keysToEncrypt, keysToOmit });

    const token = await generateDriverRegistrationToken({ ...encryptedData, phoneNumberHash });

    await sendDriverRegistrationEmail(email, token);

    res.status(200).end();
  } catch (error: unknown) {
    handleRequestError(res, error);
  }
}
