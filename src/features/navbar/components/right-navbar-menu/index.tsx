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
        <div className='py-1' role='none'>
          <a
            href='#'
            className='block px-4 py-1 hover:text-gray-900 hover:bg-gray-100'
            role='menuitem'
            tabIndex={-1}
            id='menu-item-0'
          >
            Low to High
          </a>
        </div>
      </DropdownButton>
      <HamburgerButton />
    </div>
  );
};

export default RightNavbarMenu;

{
  /* <div className='relative inline-block'>
        <button className='flex items-center p-2 rounded-md'>
          <span className='mr-4'>Hover Dropdown</span>
        </button>

        <div className='absolute right-0 py-1 text-gray-500 bg-white rounded-lg shadow-xl min-w-max'>
          <a href='#' className='block px-4 py-1 hover:text-gray-900 hover:bg-gray-100'>
            Lorem, ipsum.
          </a>
          <a href='#' className='block px-4 py-1 hover:text-gray-900 hover:bg-gray-100'>
            Lorem, ipsum dolor.
          </a>
          <a href='#' className='block px-4 py-1 hover:text-gray-900 hover:bg-gray-100'>
            Lorem ipsum dolor sit amet.
          </a>
        </div>
      </div> */
}
