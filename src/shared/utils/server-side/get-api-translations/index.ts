import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { createTranslator } from 'next-intl';

import getServerCookie from '@/shared/utils/server-side/cookies';

import { routing } from '@/i18n/routing';
import { LANGUAGE } from '@/shared/consts/cookie-names';

const getApiTranslations = async (requestLocale?: RequestCookie) => {
  const cookie = requestLocale ?? (await getServerCookie(LANGUAGE));
  const locale = cookie?.value || routing.defaultLocale;

  const messages = (await import(`@/translations/${locale}-api.json`)).default;
  return createTranslator({ locale, messages });
};

export default getApiTranslations;
