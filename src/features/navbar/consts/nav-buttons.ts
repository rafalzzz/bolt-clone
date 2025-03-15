import { ABOUT_BUTTON, CONTACT_BUTTON } from '@/test-ids/navbar';

import { TNavButton } from '@/features/navbar/types/nav-button';

export const NAV_BUTTONS: Readonly<TNavButton[]> = [
  {
    href: '/#about',
    translation: 'about',
    testId: ABOUT_BUTTON,
  },
  {
    href: '/#contact',
    translation: 'contact',
    testId: CONTACT_BUTTON,
  },
];
