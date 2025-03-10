'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import DriverCompleteRegistrationForm from '@/features/driver/components/driver-complete-registration-form';
import PageDescription from '@/shared/components/page-description';
import PageError from '@/shared/components/page-error';

import {
  DRIVER_REGISTRATION_COMPLETE_PAGE_DESCRIPTION,
  JWT_TOKEN_ERROR,
} from '@/test-ids/driver-registration-complete-page';

import { TDriverCompleteRegistration } from '@/features/driver/types';

const DriverCompleteRegistration: FC<TDriverCompleteRegistration> = ({ tokenPayload }) => {
  const t = useTranslations('DriverRegistrationCompletePage');

  const tokenErrors = useTranslations('JwtTokenErrors');

  if ('error' in tokenPayload) {
    return <PageError testId={JWT_TOKEN_ERROR}>{tokenErrors(tokenPayload.error)}</PageError>;
  }

  return (
    <>
      <PageDescription
        description={t('description')}
        secondaryDescription={t('secondaryDescription')}
        testId={DRIVER_REGISTRATION_COMPLETE_PAGE_DESCRIPTION}
      />
      <DriverCompleteRegistrationForm tokenPayload={tokenPayload} />
    </>
  );
};

export default dynamic(() => Promise.resolve(DriverCompleteRegistration), { ssr: false });
