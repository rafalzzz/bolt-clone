import getServerCookie from '@/shared/utils/server-side/cookies';

import { routing } from '@/i18n/routing';
import { LANGUAGE } from '@/shared/consts/cookie-names';

const getLocaleValue = async () => {
  const cookie = await getServerCookie(LANGUAGE);
  return cookie?.value || routing.defaultLocale;
};

export default getLocaleValue;
