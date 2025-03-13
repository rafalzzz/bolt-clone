import { useTranslations } from 'next-intl';

import { TSidebar } from '@/features/navbar/types';

const HamburgerButton = <T extends HTMLButtonElement>({
  ref,
  isSidebarOpen,
  setIsSidebarOpen,
}: TSidebar<T>) => {
  const t = useTranslations('HamburgerButton');

  return (
    <button
      ref={ref}
      type='button'
      className='px-2 py-2 border-2 rounded-md text-sm primary-button'
      aria-controls='mobile-menu'
      aria-label={t(isSidebarOpen ? 'hideNavigation' : 'showNavigation')}
      aria-expanded={isSidebarOpen}
      onClick={() => setIsSidebarOpen((prevState) => !prevState)}
    >
      {isSidebarOpen ? (
        <svg
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
  );
};

export default HamburgerButton;
