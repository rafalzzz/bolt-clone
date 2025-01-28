'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useRef, useState } from 'react';

import CustomDropdownMenuItem from '@/shared/components/custom-dropdown-menu-item';
import DropdownButton from '@/shared/components/dropdown-button';

import useOnClickOutside from '@/shared/hooks/use-on-click-outside';

import { setCookieValue } from '@/shared/utils/client-side/cookies';

import { LANGUAGE } from '@/shared/consts/cookie-names';
import { LANGUAGES } from '@/shared/consts/languages';

import { LANGUAGE_BUTTON, LANGUAGE_BUTTON_ITEM } from '@/test-ids/navbar';

const LOCALE_PARAM_INDEX = 1;

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const onClick = () => setIsOpen((prevState) => !prevState);

  const hideDropdownMenu = () => setIsOpen(false);

  const dropdownButtonOnClick = (value: string) => {
    const slicedPathname = pathname?.split('/');

    if (slicedPathname) {
      slicedPathname[LOCALE_PARAM_INDEX] = value;
      router.push(slicedPathname.join('/'));
      setCookieValue({ name: LANGUAGE, value });
    }
  };

  const onDropdownMenuItemClick = (lang: string) => {
    dropdownButtonOnClick(lang);
    hideDropdownMenu();
  };

  useOnClickOutside(ref, hideDropdownMenu);

  return (
    <DropdownButton
      showArrow
      ref={ref}
      text={locale.toUpperCase()}
      isOpen={isOpen}
      buttonClassName='h-11 p-2 rounded-md flex items-center text-sm font-bold primary-button'
      onClick={onClick}
      ariaLabel='Language switcher'
      testId={LANGUAGE_BUTTON}
    >
      <ul role='none'>
        {LANGUAGES.map((lang) => (
          <li key={lang}>
            <CustomDropdownMenuItem
              text={lang.toUpperCase()}
              onClick={() => onDropdownMenuItemClick(lang)}
              testId={LANGUAGE_BUTTON_ITEM}
            />
          </li>
        ))}
      </ul>
    </DropdownButton>
  );
};

export default LanguageSwitcher;
