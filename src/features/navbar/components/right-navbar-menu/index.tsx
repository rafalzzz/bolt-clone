import { useTranslations } from 'next-intl';

import HamburgerButton from '@/features/navbar/components/hamburger-button';
import LanguageSwitcher from '@/features/navbar/components/language-switcher';
import ThemeButton from '@/features/navbar/components/theme-button';
import DropdownButton from '@/shared/components/dropdown-button';

const RightNavbarMenu = () => {
  const t = useTranslations('RightMenu');

  return (
    <div className='flex gap-2'>
      <LanguageSwitcher />
      <ThemeButton />
      <DropdownButton text={t('Register')}>
        <ul className='py-1' role='none'>
          <li>
            <a
              href='#'
              className='block px-4 py-2 text-gray-600 hover:bg-gray-200
              dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 
              dark:hover:text-white font-semibold transition'
              role='menuitem'
              tabIndex={-1}
              id='menu-item-0'
            >
              {t('RegisterAsDriver')}
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block px-4 py-2 text-gray-600 hover:bg-gray-200
              dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 
              dark:hover:text-white font-semibold transition'
              role='menuitem'
              tabIndex={-1}
              id='menu-item-0'
            >
              {t('RegisterAsClient')}
            </a>
          </li>
        </ul>
      </DropdownButton>
      <HamburgerButton />
    </div>
  );
};

export default RightNavbarMenu;
