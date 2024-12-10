import HamburgerButton from '@/features/navbar/components/hamburger-button';
import LanguageSwitcher from '@/features/navbar/components/language-switcher';
import ThemeButton from '@/features/navbar/components/theme-button';

const RightNavbarMenu = () => (
  <div className='flex'>
    <LanguageSwitcher />
    <ThemeButton />
    <HamburgerButton />
  </div>
);

export default RightNavbarMenu;
