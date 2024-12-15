import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import HamburgerButton from '@/features/navbar/components/hamburger-button';
import LanguageSwitcher from '@/features/navbar/components/language-switcher';
import ThemeButton from '@/features/navbar/components/theme-button';
import DropdownButton from '@/shared/components/dropdown-button';

import addParamsToUrl from '@/shared/utils/add-params-to-url';

import { REGISTER_BUTTON_MENU } from '../../consts/register-button-menu';

const RightNavbarMenu = () => {
  const locale = useLocale();
  const t = useTranslations('RightMenu');

  return (
    <div className='flex gap-2'>
      <LanguageSwitcher />
      <ThemeButton />
      <DropdownButton text={t('register')}>
        <ul role='none'>
          {REGISTER_BUTTON_MENU.map(({ translation, href }) => (
            <li key={translation}>
              <Link
                href={addParamsToUrl(href, { locale })}
                className='block px-4 py-2 text-gray-600 hover:bg-gray-200
                  dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 
                  dark:hover:text-white font-semibold transition'
                role='menuitem'
                tabIndex={-1}
                id='menu-item-0'
              >
                {t(translation)}
              </Link>
            </li>
          ))}
        </ul>
      </DropdownButton>
      <HamburgerButton />
    </div>
  );
};

export default RightNavbarMenu;
