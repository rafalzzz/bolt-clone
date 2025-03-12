import { useTranslations } from 'next-intl';
import { type Dispatch, type SetStateAction, useRef } from 'react';

import CustomMenuItem from '@/shared/components/custom-menu-item';

import useOnClickOutside from '@/shared/hooks/use-on-click-outside';
import useRedirect from '@/shared/hooks/use-redirect';

import { SIGN_UP_SECTION_ITEM } from '@/test-ids/navbar';

import { SIGN_UP_SECTION } from '@/features/navbar/consts/sign-up-section';

import './sidebar.scss';

type TSidebar = { isSidebarOpen: boolean; setIsSidebarOpen: Dispatch<SetStateAction<boolean>> };

const Sidebar: React.FC<TSidebar> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations('SignUpSection');

  const redirect = useRedirect();

  const hideSidebar = () => setIsSidebarOpen(false);

  const onDropdownMenuItemClick = (href: string) => {
    redirect(href);
    hideSidebar();
  };

  useOnClickOutside(ref, hideSidebar);

  return (
    <nav
      ref={ref}
      id='sidebar'
      className={`fixed right-0 top-[68px] bottom-0 w-full sm:max-w-xs lg:w-80 bg-backgroundColor pt-6 pb-8 shadow-lg md:border-l sm:border-l border-t border-primaryColor transition sidebar--${isSidebarOpen ? 'open' : 'closed'}`}
    >
      <section className='px-4 pb-6 sm:hidden'>
        <h3 className='mb-2 text-md font-medium uppercase text-textColor transition'>
          {t('register')}
        </h3>
        <ul className='mb-8 text-sm font-medium'>
          {SIGN_UP_SECTION.map(({ translation, href }) => (
            <li key={translation}>
              <CustomMenuItem
                text={t(translation)}
                className='flex w-full items-center rounded py-3 pl-3 pr-4 menu-item'
                onClick={() => onDropdownMenuItemClick(href)}
                testId={SIGN_UP_SECTION_ITEM}
              />
            </li>
          ))}
        </ul>
      </section>
    </nav>
  );
};

export default Sidebar;
