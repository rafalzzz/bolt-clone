import { useTranslations } from 'next-intl';

import NavButton from '../nav-button';

import NAV_BUTTONS from '../../consts/nav-buttons';

const Navigation = () => {
  const t = useTranslations('Navigation');

  return (
    <ul className='hidden md:flex flex-row space-x-4'>
      {NAV_BUTTONS.map(({ href, text }) => (
        <NavButton key={text} href={href} text={t(text)} />
      ))}
    </ul>
  );
};

export default Navigation;
