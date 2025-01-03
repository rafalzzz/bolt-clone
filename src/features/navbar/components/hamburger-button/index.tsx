import React from 'react';

import './hamburger-button.scss';

const HamburgerButton = () => (
  <button
    type='button'
    className='hamburger-button'
    aria-controls='mobile-menu'
    aria-expanded='false'
    aria-label='Hamburger button'
  >
    <svg
      className='block h-6 w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M4 6h16M4 12h16m-7 6h7'
      />
    </svg>
  </button>
);

export default HamburgerButton;
