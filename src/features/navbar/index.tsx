import React from 'react';

import Logo from '@/features/navbar/components/logo';
import Navigation from '@/features/navbar/components/navigation';
import RightNavbarMenu from '@/features/navbar/components/right-navbar-menu';

const Navbar = () => (
  <header
    className='flex flex-wrap items-center justify-between mx-auto left-0 
      right-0 bg-white dark:bg-gray-900 transition top-0 z-40'
  >
    <nav
      className='transition top-0 z-40 flex flex-wrap items-center justify-between 
        w-full tracking-wide w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-6 py-3'
    >
      <Logo />
      <Navigation />
      <RightNavbarMenu />
    </nav>
  </header>
);

export default Navbar;
