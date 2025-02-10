'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import DriverCompleteRegistrationForm from '@/features/driver/components/driver-complete-registration-form';
import PageDescription from '@/shared/components/page-description';

import { TDriverCompleteRegistration } from '../../types';

const DriverCompleteRegistration: FC<TDriverCompleteRegistration> = ({ token }) => {
  const t = useTranslations('DriverCompletePage');

  return (
    <>
      <PageDescription
        description={t('description')}
        secondaryDescription={t('secondaryDescription')}
      />
      <DriverCompleteRegistrationForm token={token} />
    </>
  );
};

export default dynamic(() => Promise.resolve(DriverCompleteRegistration), { ssr: false });
