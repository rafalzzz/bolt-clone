import React from 'react';

import Logo from '@/features/navbar/components/logo';
import Navigation from '@/features/navbar/components/navigation';
import RightNavbarMenu from '@/features/navbar/components/right-navbar-menu';

import './navbar.scss';

const Navbar = () => (
  <header className='navbar'>
    <nav className='navbar__container custom-padding'>
      <Logo />
      <Navigation />
      <RightNavbarMenu />
    </nav>
  </header>
);

export default Navbar;
