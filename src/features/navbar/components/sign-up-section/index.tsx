import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import SidebarSection from '@/features/navbar/components/sidebar-section';
import CustomLink, { TCustomLink } from '@/shared/components/custom-link';

import { SIGN_UP_SECTION } from '@/features/navbar/consts/sidebar-sections';

type TSignUpSection = Pick<TCustomLink, 'onClick'>;

const SignUpSection: FC<TSignUpSection> = ({ onClick }) => {
  const t = useTranslations('SignUpSection');

  return (
    <SidebarSection header={t('register')} className='px-4 pb-6 sm:hidden'>
      {SIGN_UP_SECTION.map(({ translation, href }) => (
        <li key={translation}>
          <CustomLink href={href} onClick={onClick}>
            {t(translation)}
          </CustomLink>
        </li>
      ))}
    </SidebarSection>
  );
};

export default SignUpSection;
