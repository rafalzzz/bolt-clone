import Link from 'next/link';
import './sidebar.scss';

const Sidebar: React.FC<{ isSidebarOpen: boolean }> = ({ isSidebarOpen }) => (
  <nav
    id='sidebar'
    className={`fixed right-0 top-[68px] bottom-0 w-full sm:max-w-xs lg:w-80 bg-backgroundColor pt-6 pb-8 shadow-lg md:border-l sm:border-l border-t border-primaryColor transition sidebar--${isSidebarOpen ? 'open' : 'closed'}`}
  >
    <section className='px-4 pb-6'>
      <h3 className='mb-2 text-xs font-medium uppercase text-textColor transition'>Main</h3>
      <ul className='mb-8 text-sm font-medium'>
        <li>
          <Link
            className='flex items-center rounded py-3 pl-3 pr-4 menu-item transition'
            href='#homepage'
          >
            <span className='select-none'>Homepage</span>
          </Link>
        </li>
        <li>
          <Link className='flex items-center rounded py-3 pl-3 pr-4 menu-item' href='#link1'>
            <span className='select-none'>link1</span>
          </Link>
        </li>
      </ul>
    </section>
  </nav>
);

export default Sidebar;
