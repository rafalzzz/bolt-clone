'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import DriverCompleteRegistrationForm from '@/features/driver/components/driver-complete-registration-form';
import PageDescription from '@/shared/components/page-description';
import PageError from '@/shared/components/page-error';

import { TDriverCompleteRegistration } from '../../types';

const DriverCompleteRegistration: FC<TDriverCompleteRegistration> = ({ tokenPayload }) => {
  const t = useTranslations('DriverCompletePage');

  const tokenErrors = useTranslations('JwtTokenErrors');

  if ('error' in tokenPayload) {
    return <PageError>{tokenErrors(tokenPayload.error)}</PageError>;
  }

  return (
    <>
      <PageDescription
        description={t('description')}
        secondaryDescription={t('secondaryDescription')}
      />
      <DriverCompleteRegistrationForm tokenPayload={tokenPayload} />
    </>
  );
};

export default dynamic(() => Promise.resolve(DriverCompleteRegistration), { ssr: false });
