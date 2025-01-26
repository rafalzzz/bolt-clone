'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import DropdownButton from '@/shared/components/dropdown-button';

import useOnClickOutside from '@/shared/hooks/use-on-click-outside';

import addParamsToUrl from '@/shared/utils/add-params-to-url';

import { REGISTER_BUTTON_MENU } from '@/features/navbar/consts/register-button-menu';

const RegisterButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('RightMenu');

  const handleOnClick = () => setIsOpen((prevState) => !prevState);

  const hideDropdownMenu = () => setIsOpen(false);

  const dropdownButtonOnClick = (url: string) => router.push(addParamsToUrl(url, { locale }));

  useOnClickOutside(ref, hideDropdownMenu);

  return (
    <DropdownButton
      ref={ref}
      text={t('register')}
      isOpen={isOpen}
      buttonClassName='default-button default-button-colors h-11 p-2 rounded-md'
      onClick={handleOnClick}
      ariaLabel={t('register')}
    >
      <ul role='none'>
        {REGISTER_BUTTON_MENU.map(({ translation, href }) => (
          <li key={translation}>
            <button
              type='button'
              role='menu-item'
              className='custom-dropdown-menu-item'
              aria-label={t(translation)}
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
