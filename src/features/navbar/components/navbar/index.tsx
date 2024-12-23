import React from 'react';

import Logo from '@/features/navbar/components/logo';
import Navigation from '@/features/navbar/components/navigation';
import RightNavbarMenu from '@/features/navbar/components/right-navbar-menu';

import './navbar.css';

const Navbar = () => (
  <header className='navbar-wrapper'>
    <nav className='navbar-container custom-padding'>
      <Logo />
      <Navigation />
      <RightNavbarMenu />
    </nav>
  </header>
);

export default Navbar;
