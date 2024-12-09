import type { NextConfig } from 'next';

import { LANGUAGES } from '@/shared/consts/languages';

const nextConfig: NextConfig = {
  i18n: {
    locales: Object.values(LANGUAGES),
    defaultLocale: LANGUAGES.EN,
  },
};

export default nextConfig;
