'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import DropdownButton from '@/shared/components/dropdown-button';

import useOnClickOutside from '@/shared/hooks/use-on-click-outside';

import addParamsToUrl from '@/shared/utils/add-params-to-url';

import { REGISTER_BUTTON_MENU } from '../../consts/register-button-menu';

import './register-button.css';

const RegisterButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLUListElement>(null);

  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('RightMenu');

  const handleOnClick = () => setIsOpen((prevState) => !prevState);

  const hideDropdownMenu = () => setIsOpen(false);

  const dropdownButtonOnClick = (url: string) => router.push(addParamsToUrl(url, { locale }));

  useOnClickOutside(ref, hideDropdownMenu);

  return (
    <DropdownButton text={t('register')} isOpen={isOpen} onClick={handleOnClick}>
      <ul role='none' ref={ref}>
        {REGISTER_BUTTON_MENU.map(({ translation, href }) => (
          <li key={translation}>
            <button
              className='register-button'
              role='menuitem'
              type='button'
              onClick={() => {
                dropdownButtonOnClick(href);
                hideDropdownMenu();
              }}
            >
              {t(translation)}
            </button>
          </li>
        ))}
      </ul>
    </DropdownButton>
  );
};

export default RegisterButton;
