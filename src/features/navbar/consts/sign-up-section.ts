import { TNavButton } from '@/features/navbar/types/nav-button';

export const SIGN_UP_SECTION: TNavButton[] = [
  { translation: 'registerAsDriver', href: `/:locale:/driver`, testId: 'registerAsDriver' },
  { translation: 'registerAsClient', href: `/:locale:/client`, testId: 'registerAsClient' },
];
