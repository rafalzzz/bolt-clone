import Link from 'next/link';
import type { FC } from 'react';

type TNavButton = Readonly<{
  href: string;
  text: string;
}>;

const NavButton: FC<TNavButton> = ({ href, text }) => (
  <Link
    href={href}
    className='default-button-colors px-4 py-2 border-2 text-sm font-light rounded-full font-sans'
  >
    {text}
  </Link>
);

export default NavButton;
