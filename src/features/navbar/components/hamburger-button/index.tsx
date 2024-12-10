import React from 'react';

const HamburgerButton = () => (
  <button
    type='button'
    className='px-2 py-2 border-2 border-white rounded-md text-sm
        font-light text-gray-600 bg-white hover:bg-gray-200
        active:bg-gray-900 active:border-gray-900 active:text-white
        focus:bg-gray-900 focus:border-gray-900 focus:text-white
        dark:border-gray-700 dark:text-gray-300 dark:bg-gray-800
        dark:hover:bg-gray-700 dark:hover:text-white transition
        flex md:hidden'
    aria-controls='mobile-menu'
    aria-expanded='false'
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
