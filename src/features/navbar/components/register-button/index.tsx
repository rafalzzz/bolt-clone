'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import CustomMenuItem from '@/shared/components/custom-menu-item';
import DropdownButton from '@/shared/components/dropdown-button';

import useOnClickOutside from '@/shared/hooks/use-on-click-outside';

import addParamsToUrl from '@/shared/utils/client-side/add-params-to-url';

import { REGISTER_BUTTON, SIGN_UP_SECTION_ITEM } from '@/test-ids/navbar';

import { SIGN_UP_SECTION } from '@/features/navbar/consts/sign-up-section';

const RegisterButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('SignUpSection');

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
      testId={REGISTER_BUTTON}
    >
      <ul role='none'>
        {SIGN_UP_SECTION.map(({ translation, href }) => (
          <li key={translation}>
            <CustomMenuItem
              text={t(translation)}
              onClick={() => onDropdownMenuItemClick(href)}
              testId={SIGN_UP_SECTION_ITEM}
            />
          </li>
        ))}
      </ul>
    </DropdownButton>
  );
};

export default RegisterButton;
