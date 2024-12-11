import { useTranslations } from 'next-intl';

import NavButton from '@/features/navbar/components/nav-button';

import { NAV_BUTTONS } from '@/features/navbar/consts/nav-buttons';

const Navigation = () => {
  const t = useTranslations('Navigation');

  const [ABOUT_BUTTON, REGISTER_BUTTON] = NAV_BUTTONS;

  return (
    <ul className='hidden md:flex flex-row space-x-4'>
      <li>
        <NavButton href={ABOUT_BUTTON.href} text={t(ABOUT_BUTTON.text)} />
      </li>
    </ul>
  );
};

export default Navigation;
