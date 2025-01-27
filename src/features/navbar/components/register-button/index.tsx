'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import CustomDropdownMenuItem from '@/shared/components/custom-dropdown-menu-item';
import DropdownButton from '@/shared/components/dropdown-button';

import useOnClickOutside from '@/shared/hooks/use-on-click-outside';

import addParamsToUrl from '@/shared/utils/add-params-to-url';

import { REGISTER_BUTTON_MENU } from '@/features/navbar/consts/register-button-menu';

import { REGISTER_BUTTON } from '@/test-ids/navbar';

const RegisterButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('RightMenu');

  const handleOnClick = () => setIsOpen((prevState) => !prevState);

  const hideDropdownMenu = () => setIsOpen(false);

  const dropdownButtonOnClick = (url: string) => router.push(addParamsToUrl(url, { locale }));

  const onDropdownMenuItemClick = (href: string) => {
    dropdownButtonOnClick(href);
    hideDropdownMenu();
  };

  useOnClickOutside(ref, hideDropdownMenu);

  return (
    <DropdownButton
      ref={ref}
      text={t('register')}
      isOpen={isOpen}
      buttonClassName='h-11 p-2 rounded-md flex items-center text-sm font-bold primary-button'
      onClick={handleOnClick}
      ariaLabel={t('register')}
      buttonTestId={REGISTER_BUTTON}
    >
      <ul role='none'>
        {REGISTER_BUTTON_MENU.map(({ translation, href }) => (
          <li key={translation}>
            <CustomDropdownMenuItem
              text={t(translation)}
              onClick={() => onDropdownMenuItemClick(href)}
            />
          </li>
        ))}
      </ul>
    </DropdownButton>
  );
};

export default RegisterButton;
