import { useTranslations } from 'next-intl';

import NavButton from '@/features/navbar/components/nav-button';

import { NAV_BUTTONS } from '@/features/navbar/consts/nav-buttons';

const Navigation = () => {
  const t = useTranslations('Navigation');

  return (
    <ul className='hidden md:flex flex-row space-x-4'>
      {NAV_BUTTONS.map(({ translation, href, testId }) => (
        <li key={translation}>
          <NavButton href={href} text={t(translation)} testId={testId} />
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
