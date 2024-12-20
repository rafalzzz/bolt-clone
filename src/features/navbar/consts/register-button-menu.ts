import { TNavButton } from '@/features/navbar/types/nav-button';

export const REGISTER_BUTTON_MENU: TNavButton[] = [
  { translation: 'registerAsDriver', href: `/:locale:/driver` },
  { translation: 'registerAsClient', href: `/:locale:/client` },
];
