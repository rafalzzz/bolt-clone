import {
  LOGIN_CLIENT,
  LOGIN_DRIVER,
  REGISTER_CLIENT,
  REGISTER_DRIVER,
} from '@/shared/consts/routes';

import { TNavButton } from '@/features/navbar/types/nav-button';

export const SIGN_UP_SECTION: TNavButton[] = [
  { translation: 'registerAsDriver', href: REGISTER_DRIVER, testId: 'registerAsDriver' },
  { translation: 'registerAsClient', href: REGISTER_CLIENT, testId: 'registerAsClient' },
];

export const LOG_IN_SECTION: TNavButton[] = [
  { translation: 'loginAsDriver', href: LOGIN_DRIVER, testId: 'loginAsDriver' },
  { translation: 'loginAsClient', href: LOGIN_CLIENT, testId: 'loginAsClient' },
];
