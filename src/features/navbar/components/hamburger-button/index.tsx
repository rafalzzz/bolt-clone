'use client';

import { useState } from 'react';

import Sidebar from '../sidebar';

const HamburgerButton = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <button
        type='button'
        className='px-2 py-2 border-2 rounded-md text-sm primary-button'
        aria-controls='mobile-menu'
        aria-label='Hamburger'
        aria-expanded={isSidebarOpen}
        onClick={() => setIsSidebarOpen((prevState) => !prevState)}
      >
        {isSidebarOpen ? (
          <svg
            id='navOpen'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='h-7 w-7'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        ) : (
          <svg
            id='navClosed'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='h-7 w-7'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
            />
          </svg>
        )}
      </button>
      <Sidebar isSidebarOpen={isSidebarOpen} />
    </>
  );
};

export default HamburgerButton;
