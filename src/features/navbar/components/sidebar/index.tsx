import { useTranslations } from 'next-intl';

import SidebarSection from '@/features/navbar/components/sidebar-section';
import SignUpSection from '@/features/navbar/components/sign-up-section';
import CustomLink from '@/shared/components/custom-link';

import { LOG_IN_SECTION } from '@/features/navbar/consts/sidebar-sections';

import { TSidebar } from '@/features/navbar/types/sidebar';

import './sidebar.scss';

const Sidebar = <T extends HTMLElement>({
  isSidebarOpen = false,
  ref,
  setIsSidebarOpen,
}: TSidebar<T>) => {
  const t = useTranslations('Sidebar');

  const hideSidebar = () => setIsSidebarOpen(false);

  return (
    <nav
      ref={ref}
      id='sidebar'
      className={`fixed right-0 top-[68px] bottom-0 w-full sm:max-w-xs lg:w-80 bg-backgroundColor pt-6 pb-8 shadow-lg md:border-l sm:border-l border-t border-primaryColor transition sidebar--${isSidebarOpen ? 'open' : 'closed'}`}
    >
      <SignUpSection onClick={hideSidebar} />
      <SidebarSection header={t('login')}>
        {LOG_IN_SECTION.map(({ translation, href }) => (
          <li key={translation}>
            <CustomLink href={href} onClick={hideSidebar}>
              {t(translation)}
            </CustomLink>
          </li>
        ))}
      </SidebarSection>
    </nav>
  );
};

export default Sidebar;
