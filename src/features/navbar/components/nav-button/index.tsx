import Link from 'next/link';

type TNavButton = Readonly<{
  href: string;
  text: string;
}>;

const NavButton = ({ href, text }: TNavButton) => (
  <Link
    href={href}
    className='px-4 py-2 border-2 border-gray-300 
        rounded-full text-sm font-light text-gray-600 
        bg-gray-100 hover:bg-gray-200 transition font-sans
        active:bg-gray-900 active:border-gray-900 active:text-white 
        focus:bg-gray-900 focus:border-gray-900 focus:text-white
        dark:border-gray-700 dark:text-gray-300 dark:bg-gray-800 
        dark:hover:bg-gray-700 dark:active:bg-gray-600'
  >
    {text}
  </Link>
);

export default NavButton;
