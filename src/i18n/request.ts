import { getRequestConfig } from 'next-intl/server';

import { DEFAULT_LANGUAGE } from '@/shared/consts/languages';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (
      await (locale === DEFAULT_LANGUAGE
        ? import('../translations/en.json')
        : import(`../translations/${locale}.json`))
    ).default,
  };
});
