import type { Session, User } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

import CustomResponseError from '@/shared/classes/custom-response-error';

import loginUser from '@/features/driver-login/utils/login-user';
import createHash from '@/shared/utils/server-side/create-hash';
import getApiTranslations from '@/shared/utils/server-side/get-api-translations';
import handleRequestError from '@/shared/utils/server-side/handle-request-error';

import { EDriverLoginFormKeys } from '@/features/driver-login/enums/driver-login-form-keys';

import { METHOD_NOT_ALLOWED } from '@/shared/consts/response-messages';

import { TApiResponse } from '@/shared/types/api-response';

export type TLoginUserResponse = {
  user: User;
  session: Session;
};

export default async function POST(
  { method, headers: { cookie }, body }: NextApiRequest,
  res: NextApiResponse<TLoginUserResponse | TApiResponse>,
) {
  if (method !== 'POST') {
    throw new CustomResponseError(405, METHOD_NOT_ALLOWED);
  }

  try {
    const t = await getApiTranslations(cookie);

    const passwordHash = createHash(body[EDriverLoginFormKeys.PASSWORD]);

    const user = {
      email: body[EDriverLoginFormKeys.EMAIL],
      password: passwordHash,
    };

    const loggedUser = await loginUser(user, t('incorrentCredentialsMessage'));

    return res.status(200).json(loggedUser);
  } catch (error: unknown) {
    handleRequestError(res, error);
  }
}
