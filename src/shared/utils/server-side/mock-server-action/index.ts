import getServerCookie from '@/shared/utils/server-side/cookies';

import { EMockedResponseType } from '@/shared/enums/mocked-respose-type';

import { MOCK_ACTION_COOKIE } from '@/test-consts/cookies';

const mockServerAction = async (): Promise<EMockedResponseType | undefined> => {
  const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

  if (isProduction) {
    return;
  }

  const cookie = await getServerCookie(MOCK_ACTION_COOKIE);
  return cookie?.value as EMockedResponseType;
};

export default mockServerAction;
