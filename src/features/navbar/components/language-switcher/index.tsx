'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useRef, useState } from 'react';

import DropdownButton from '@/shared/components/dropdown-button';

import useOnClickOutside from '@/shared/hooks/use-on-click-outside';

import { setCookieValue } from '@/shared/utils/client-side/cookies';

import { LANGUAGE } from '@/shared/consts/cookie-names';
import { LANGUAGES } from '@/shared/consts/languages';

import './language-switcher.css';

const LOCALE_PARAM_INDEX = 1;

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const handleOnClick = () => setIsOpen((prevState) => !prevState);

  const hideDropdownMenu = () => setIsOpen(false);

  const dropdownButtonOnClick = (value: string) => {
    const slicedPathname = pathname?.split('/');

    if (slicedPathname) {
      slicedPathname[LOCALE_PARAM_INDEX] = value;
      router.push(slicedPathname.join('/'));
      setCookieValue({ name: LANGUAGE, value });
    }
  };

  useOnClickOutside(ref, hideDropdownMenu);

  return (
    <DropdownButton
      showArrow
      ref={ref}
      text={locale.toUpperCase()}
      isOpen={isOpen}
      buttonClassName='default-button language-switcher'
      onClick={handleOnClick}
    >
      <ul role='none'>
        {LANGUAGES.map((lang) => (
          <li key={lang}>
            <button
              type='button'
              role='menu-item'
              className='dropdown-menu-item__menu-item'
              onClick={() => {
                dropdownButtonOnClick(lang);
                hideDropdownMenu();
              }}
            >
              {lang.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
    </DropdownButton>
  );
};

export default LanguageSwitcher;
