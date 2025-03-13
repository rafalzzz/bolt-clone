'use client';

import { useRef, useState } from 'react';

import Sidebar from '@/features/navbar/components//sidebar';
import HamburgerButton from '@/features/navbar/components/hamburger-button';
import LanguageSwitcher from '@/features/navbar/components/language-switcher';
import RegisterButton from '@/features/navbar/components/register-button';
import ThemeButton from '@/features/navbar/components/theme-button';

import useOnClickOutside from '@/shared/hooks/use-on-click-outside';

const RightNavbarMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const hamburgerButtonRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const hideSidebar = () => setIsSidebarOpen((prevState) => !prevState);

  useOnClickOutside(sidebarRef, hideSidebar);

  return (
    <>
      <ul className='flex m-0 p-0'>
        <li className='mr-2'>
          <LanguageSwitcher />
        </li>
        <li className='mr-2'>
          <ThemeButton />
        </li>
        <li className='mr-2 hidden sm:block'>
          <RegisterButton />
        </li>
        <li>
          <HamburgerButton
            ref={hamburgerButtonRef}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </li>
      </ul>
      <Sidebar ref={sidebarRef} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
    </>
  );
};

export default RightNavbarMenu;
