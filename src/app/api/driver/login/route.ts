import loginUser from '@/features/driver-login/utils/login-user';
import getApiTranslations from '@/shared/utils/server-side/get-api-translations';
import handleRequestError from '@/shared/utils/server-side/handle-request-error';
import sendResponse from '@/shared/utils/server-side/send-response';

import { EDriverLoginFormKeys } from '@/features/driver-login/enums/driver-login-form-keys';

export async function POST(request: Request) {
  try {
    const t = await getApiTranslations();
    const body = await request.json();

    const user = {
      email: body[EDriverLoginFormKeys.EMAIL],
      password: body[EDriverLoginFormKeys.PASSWORD],
    };

    await loginUser(user, t('incorrentCredentialsMessage'));

    return sendResponse({ status: 200 });
  } catch (error: unknown) {
    return handleRequestError(error);
  }
}
