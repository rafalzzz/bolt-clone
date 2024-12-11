import React from 'react';

import Logo from '@/features/navbar/components/logo';
import Navigation from '@/features/navbar/components/navigation';
import RightNavbarMenu from '@/features/navbar/components/right-navbar-menu';

const Navbar = () => (
  <header className='bg-white dark:bg-gray-900 transition fixed top-0 z-40 flex flex-wrap items-center justify-between mx-auto left-0 right-0'>
    <nav className='transition top-0 z-40 flex flex-wrap items-center justify-between w-full tracking-wide w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-6 py-3'>
      <Logo />

      {/* <div className='relative w-full overflow-hidden transition-all duration-700 lg:hidden max-h-0'>
        <div className='flex flex-col my-3 space-y-2 text-lg hover:font-b text-gray-600'>
          <a href='#' className='hover:text-gray-900'>
            <span>Link</span>
          </a>
          <hr />
          <a href='#' className='hover:text-gray-900'>
            <span>Link</span>
          </a>
          <hr />
          <a href='#' className='hover:text-gray-900'>
            <span>Link</span>
          </a>
        </div>
        <div className='py-6 px-5 space-y-6'>
          <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
            <a href='#' className='text-base font-medium text-gray-900 hover:text-gray-700'>
              About
            </a>

            <a href='#' className='text-base font-medium text-gray-900 hover:text-gray-700'>
              Contact
            </a>
          </div>
        </div>
        <div>
          <a
            href='#'
            className='w-full flex items-center justify-center text-white px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-600 hover:bg-gray-700'
          >
            Sign up
          </a>
          <p className='mt-6 text-center text-base font-medium text-gray-500'>
            Existing customer?
            <a href='#' className='text-gray-600 hover:text-gray-900'>
              Sign in
            </a>
          </p>
        </div>
      </div> */}

      <RightNavbarMenu />
    </nav>
  </header>
);

export default Navbar;
