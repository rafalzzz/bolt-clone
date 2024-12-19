'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ChangeEvent } from 'react';

import { setCookieValue } from '@/shared/utils/client-side/cookies';

import { LANGUAGE } from '@/shared/consts/cookie-names';
import { LANGUAGES } from '@/shared/consts/languages';

import './language-switcher.css';

const LOCALE_PARAM_INDEX = 1;

const LanguageSwitcher = () => {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const handleOnChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    const slicedPathname = pathname?.split('/');

    if (slicedPathname) {
      slicedPathname[LOCALE_PARAM_INDEX] = value;
      router.push(slicedPathname.join('/'));
      setCookieValue({ name: LANGUAGE, value });
    }
  };

  return (
    <select value={locale} className='language-switcher' onChange={handleOnChange}>
      {LANGUAGES.map((key) => (
        <option key={key} value={key}>
          {key.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
