import Link from 'next/link';
import { FC } from 'react';

import './nav-button.css';

type TNavButton = Readonly<{
  href: string;
  text: string;
}>;

const NavButton: FC<TNavButton> = ({ href, text }) => (
  <Link href={href} className='nav-button'>
    {text}
  </Link>
);

export default NavButton;
