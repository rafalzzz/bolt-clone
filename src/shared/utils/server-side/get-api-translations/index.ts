import { parse } from 'cookie';
import { createTranslator } from 'next-intl';

import { LANGUAGE } from '@/shared/consts/cookie-names';

const getApiTranslations = async (cookie?: string) => {
  const cookies = parse(cookie || '');
  const locale = cookies[LANGUAGE] || 'en';

  const messages = (await import(`@/translations/${locale}-api.json`)).default;
  return createTranslator({ locale, messages });
};

export default getApiTranslations;
