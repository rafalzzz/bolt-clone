import HamburgerButton from '@/features/navbar/components/hamburger-button';
import LanguageSwitcher from '@/features/navbar/components/language-switcher';
import RegisterButton from '@/features/navbar/components/register-button';
import ThemeButton from '@/features/navbar/components/theme-button';

const RightNavbarMenu = () => (
  <div className='flex gap-2'>
    <LanguageSwitcher />
    <ThemeButton />
    <RegisterButton />
    <HamburgerButton />
  </div>
);

export default RightNavbarMenu;
