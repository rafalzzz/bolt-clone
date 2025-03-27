import getServerCookie from '@/shared/utils/server-side/cookies';

import { EMockedResponseType } from '@/shared/enums/mocked-respose-type';

const mockServerAction = async (): Promise<EMockedResponseType | undefined> => {
  const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

  if (isProduction) {
    return;
  }

  const cookie = await getServerCookie('mock-server-action');
  return cookie?.value as EMockedResponseType;
};

export default mockServerAction;
