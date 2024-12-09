import ThemeButton from '../theme-button';
import HamburgerButton from '../hamburger-button';
import LanguageSwitcher from '../language-switcher';

const RightNavbarMenu = () => (
  <div className='flex'>
    <LanguageSwitcher />
    <ThemeButton />
    <HamburgerButton />
  </div>
);

export default RightNavbarMenu;
