'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import DriverLoginForm from '@/features/driver-login/components/driver-login-form';
import PageDescription from '@/shared/components/page-description';

import { DRIVER_LOGIN_PAGE_DESCRIPTION } from '@/test-ids/driver-login-page';

const DriverLogin = () => {
  const t = useTranslations('DriverLoginPage');

  return (
    <>
      <PageDescription
        description={t('description')}
        secondaryDescription={t('secondaryDescription')}
        testId={DRIVER_LOGIN_PAGE_DESCRIPTION}
      />
      <DriverLoginForm />
    </>
  );
};

export default dynamic(() => Promise.resolve(DriverLogin), { ssr: false });
