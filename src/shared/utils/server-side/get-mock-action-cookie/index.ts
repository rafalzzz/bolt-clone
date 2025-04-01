import getServerCookie from '@/shared/utils/server-side/cookies';

import isTestingEnvironment from '@/test-helpers/is-testing-environment';

import { EMockedResponseType } from '@/shared/enums/mocked-respose-type';

import { MOCK_ACTION_COOKIE } from '@/test-consts/cookies';

const getMockActionCookie = async (): Promise<EMockedResponseType | undefined> => {
  if (!isTestingEnvironment()) {
    return;
  }

  const cookie = await getServerCookie(MOCK_ACTION_COOKIE);
  return cookie?.value as EMockedResponseType;
};

export default getMockActionCookie;
