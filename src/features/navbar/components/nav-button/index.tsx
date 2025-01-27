import Link from 'next/link';
import type { FC } from 'react';

type TNavButton = Readonly<{
  href: string;
  text: string;
  testId: string;
}>;

const NavButton: FC<TNavButton> = ({ href, text, testId }) => (
  <Link
    href={href}
    className='px-4 py-2 border-2 text-sm font-light rounded-full font-sans primary-button'
    aria-label={text}
    data-testid={testId}
  >
    {text}
  </Link>
);

export default NavButton;
