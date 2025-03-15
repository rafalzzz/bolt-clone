import Link from 'next/link';
import type { FC } from 'react';

type TRedirection = Record<'text' | 'redirectionText' | 'redirectionUrl', string>;

const Redirection: FC<TRedirection> = ({ text, redirectionText, redirectionUrl }) => (
  <footer className='flex items-center justify-start mt-8 text-center text-textColor dark:text-textColor transition'>
    <span>{text}</span>
    <Link
      prefetch
      href={redirectionUrl}
      className='text-primaryColor no-underline hover:underline cursor-pointer dark:text-secondaryColor ml-1 transition'
    >
      {redirectionText} &#8599;
    </Link>
  </footer>
);

export default Redirection;
