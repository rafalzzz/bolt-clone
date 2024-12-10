import { useTranslations } from 'next-intl';

import NavButton from '@/features/navbar/components/nav-button';

import { NAV_BUTTONS } from '@/features/navbar/consts/nav-buttons';

const Navigation = () => {
  const t = useTranslations('Navigation');

  return (
    <ul className='hidden md:flex flex-row space-x-4'>
      {NAV_BUTTONS.map(({ href, text }) => (
        <li key={text}>
          <NavButton href={href} text={t(text)} />
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
