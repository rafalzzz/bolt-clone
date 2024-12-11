'use client';
import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';

import { setCookieValue } from '@/shared/utils/cookies';

import { LANGUAGE } from '@/shared/consts/cookie-names';
import { LANGUAGES } from '@/shared/consts/languages';

const LanguageSwitcher = () => {
  const { locale, pathname, asPath, query, push } = useRouter();

  const handleOnChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    push({ pathname, query }, asPath, { locale: value });
    setCookieValue({ name: LANGUAGE, value });
  };

  return (
    <select
      value={locale}
      className='bg-gray-100 p-2 border-none bg-white rounded-md text-gray-600 text-sm 
        rounded-lg block focus:outline-none transition hover:bg-gray-200 hover:cursor-pointer
        dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:active:bg-gray-600'
      onChange={handleOnChange}
    >
      {Object.keys(LANGUAGES).map((key) => (
        <option key={key} value={key.toLowerCase()}>
          {key}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
