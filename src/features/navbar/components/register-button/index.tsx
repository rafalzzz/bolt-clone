'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import CustomLink from '@/shared/components/custom-link';
import DropdownButton from '@/shared/components/dropdown-button';

import useOnClickOutside from '@/shared/hooks/use-on-click-outside';

import { REGISTER_BUTTON, SIGN_UP_SECTION_ITEM } from '@/test-ids/navbar';

import { SIGN_UP_SECTION } from '@/features/navbar/consts/sidebar-sections';

const RegisterButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations('SignUpSection');

  const hideDropdownMenu = () => setIsOpen(false);

  useOnClickOutside(ref, hideDropdownMenu);

  return (
    <DropdownButton
      ref={ref}
      text={t('register')}
      isOpen={isOpen}
      buttonClassName='h-11 p-2 rounded-md flex items-center text-sm font-bold primary-button'
      onClick={() => setIsOpen((prevState) => !prevState)}
      ariaLabel={t('register')}
      testId={REGISTER_BUTTON}
    >
      <ul role='none'>
        {SIGN_UP_SECTION.map(({ translation, href }) => (
          <li key={translation}>
            <CustomLink
              href={href}
              className='flex w-full items-center py-3 pl-3 pr-4 menu-item'
              testId={SIGN_UP_SECTION_ITEM}
              onClick={hideDropdownMenu}
            >
              {t(translation)}
            </CustomLink>
          </li>
        ))}
      </ul>
    </DropdownButton>
  );
};

export default RegisterButton;
