import { useTranslations } from 'next-intl';

import NavButton from '@/features/navbar/components/nav-button';

import { NAV_BUTTONS } from '@/features/navbar/consts/nav-buttons';

import './navigation.scss';

const Navigation = () => {
  const t = useTranslations('Navigation');

  return (
    <ul className='navigation'>
      {NAV_BUTTONS.map(({ translation, href }) => (
        <li key={translation}>
          <NavButton href={href} text={t(translation)} />
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
