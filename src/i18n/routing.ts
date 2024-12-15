import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { DEFAULT_LANGUAGE, LANGUAGES } from '@/shared/consts/languages';

export const routing = defineRouting({
  locales: LANGUAGES,
  defaultLocale: DEFAULT_LANGUAGE,
  pathnames: {
    '/': '/',
    '/pathnames': {
      en: '/pathnames',
      pl: '/ścieżki',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing);
