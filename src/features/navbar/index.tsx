import React from 'react';

import Logo from '@/features/navbar/components/logo';
import Navigation from '@/features/navbar/components/navigation';
import RightNavbarMenu from '@/features/navbar/components/right-navbar-menu';

const Navbar = () => (
  <header className='bg-white dark:bg-gray-900 transition'>
    <nav
      className='
        text-white w-full max-w-5xl mx-auto px-4 sm:px-6 
        lg:px-6 py-3 flex items-center justify-between h-14
      '
    >
      <Logo />
      <Navigation />
      <RightNavbarMenu />
    </nav>
  </header>
);

export default Navbar;
