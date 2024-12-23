import Link from 'next/link';
import { FC } from 'react';

import './nav-button.scss';

type TNavButton = Readonly<{
  href: string;
  text: string;
}>;

const NavButton: FC<TNavButton> = ({ href, text }) => (
  <Link href={href} className='nav-button default-button-colors'>
    {text}
  </Link>
);

export default NavButton;
