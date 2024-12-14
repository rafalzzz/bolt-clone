'use client';

import { useRouter, useParams, usePathname } from 'next/navigation';
import { ChangeEvent } from 'react';

import { setCookieValue } from '@/shared/utils/cookies';

import { LANGUAGE } from '@/shared/consts/cookie-names';
import { LANGUAGES } from '@/shared/consts/languages';

const LanguageSwitcher = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const locale = params?.locale || 'en';

  const handleOnChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    const slicedPathname = pathname?.split('/');

    if (slicedPathname) {
      slicedPathname[1] = value;
      router.push(slicedPathname.join('/'));
      setCookieValue({ name: LANGUAGE, value });
    }
  };

  return (
    <select
      value={locale}
      className='bg-gray-100 p-2 border-none bg-white rounded-md text-gray-600 text-sm 
        rounded-lg block focus:outline-none transition hover:bg-gray-200 hover:cursor-pointer
        dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:active:bg-gray-600'
      onChange={handleOnChange}
    >
      {LANGUAGES.map((key) => (
        <option key={key} value={key}>
          {key.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
