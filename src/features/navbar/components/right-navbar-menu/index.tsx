import HamburgerButton from '@/features/navbar/components/hamburger-button';
import LanguageSwitcher from '@/features/navbar/components/language-switcher';
import RegisterButton from '@/features/navbar/components/register-button';
import ThemeButton from '@/features/navbar/components/theme-button';

const RightNavbarMenu = () => (
  <ul className='flex m-0 p-0 list-style-type-none'>
    <li className='mr-2'>
      <LanguageSwitcher />
    </li>
    <li className='mr-2'>
      <ThemeButton />
    </li>
    <li>
      <RegisterButton />
    </li>
    <li>
      <HamburgerButton />
    </li>
  </ul>
);

export default RightNavbarMenu;
