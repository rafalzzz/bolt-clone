import type { NextRequest } from 'next/server';

import { routing } from '@/i18n/routing';
import { LANGUAGE } from '@/shared/consts/cookie-names';

const getApiLocale = (request: NextRequest) => {
  const cookie = request.cookies.get(LANGUAGE);
  return cookie?.value || routing.defaultLocale;
};

export default getApiLocale;
