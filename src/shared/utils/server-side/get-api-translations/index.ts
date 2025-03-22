import type { NextRequest } from 'next/server';
import { createTranslator } from 'next-intl';

import { routing } from '@/i18n/routing';
import { LANGUAGE } from '@/shared/consts/cookie-names';

const getApiTranslations = async (request: NextRequest) => {
  const cookie = request.cookies.get(LANGUAGE);
  const locale = cookie?.value || routing.defaultLocale;

  const messages = (await import(`@/translations/${locale}-api.json`)).default;
  return createTranslator({ locale, messages });
};

export default getApiTranslations;
