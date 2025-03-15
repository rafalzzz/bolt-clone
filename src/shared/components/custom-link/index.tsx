import Link from 'next/link';
import { useLocale } from 'next-intl';

import addParamsToUrl from '@/shared/utils/client-side/add-params-to-url';

import { TFCWithChildren } from '@/shared/types/fc-with-children';

export type TCustomLink = {
  href: string;
  className?: string;
  testId?: string;
  onClick?: () => void;
};

const CustomLink: TFCWithChildren<TCustomLink> = ({
  children,
  href,
  className = 'flex w-full items-center rounded py-3 pl-3 pr-4 menu-item',
  testId,
  onClick,
}) => {
  const locale = useLocale();

  return (
    <Link
      prefetch
      href={addParamsToUrl(href, { locale })}
      className={className}
      data-testid={testId}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
