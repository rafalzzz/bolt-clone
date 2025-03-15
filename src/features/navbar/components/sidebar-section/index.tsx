import { TFCWithChildren } from '@/shared/types/fc-with-children';

type TSidebarSection = {
  header: string;
  className?: string;
};

const SidebarSection: TFCWithChildren<TSidebarSection> = ({
  header,
  children,
  className = 'px-4 pb-6',
}) => (
  <section className={className}>
    <h3 className='mb-2 text-md font-medium uppercase text-textColor transition'>{header}</h3>
    <ul className='mb-8 text-sm font-medium'>{children}</ul>
  </section>
);

export default SidebarSection;
