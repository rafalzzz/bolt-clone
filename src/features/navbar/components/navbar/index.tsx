import Logo from '@/features/navbar/components/logo';
import Navigation from '@/features/navbar/components/navigation';
import RightNavbarMenu from '@/features/navbar/components/right-navbar-menu';

import { NAVBAR } from '@/test-ids/navbar';

const Navbar = () => (
  <header
    data-testid={NAVBAR}
    className='flex flex-wrap items-center justify-between mx-auto left-0 right-0 top-0 z-40 bg-backgroundColor border-b border-primaryColor transition'
  >
    <nav className='custom-padding top-0 z-40 flex flex-wrap tracking-wide max-w-5xl mx-auto py-3 items-center justify-between transition'>
      <Logo />
      <Navigation />
      <RightNavbarMenu />
    </nav>
  </header>
);

export default Navbar;
