import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

import { ETheme } from '@/shared/enums/theme';

const DEFAULT_THEME = ETheme.LIGHT;

const getThemeClassName = (cookie?: RequestCookie) => {
  const themeValue = cookie?.value;

  const isThemeDefined = Object.values(ETheme).includes(themeValue as ETheme);

  return isThemeDefined ? themeValue : DEFAULT_THEME;
};

export default getThemeClassName;
