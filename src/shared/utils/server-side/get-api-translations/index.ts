import { createTranslator } from 'next-intl';

import getServerCookie from '@/shared/utils/server-side/cookies';

import { LANGUAGE } from '@/shared/consts/cookie-names';

const getApiTranslations = async () => {
  const cookie = await getServerCookie(LANGUAGE);
  const locale = cookie?.value || 'en';

  const messages = (await import(`@/translations/${locale}-api.json`)).default;
  return createTranslator({ locale, messages });
};

export default getApiTranslations;
