import ThemeButton from '../theme-button';
import HamburgerButton from '../hamburger-button';
import LANGUAGESwitcher from '../language-switcher';

const RightNavbarMenu = () => (
  <div className='flex'>
    <LANGUAGESwitcher />
    <ThemeButton />
    <HamburgerButton />
  </div>
);

export default RightNavbarMenu;
