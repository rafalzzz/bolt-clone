'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import DriverRegisterForm from '@/features/driver/components/driver-register-form';
import PageDescription from '@/shared/components/page-description';

import { DRIVER_PAGE_DESCRIPTION } from '@/test-ids/driver-page';

const InitialDriverRegistration = () => {
  const t = useTranslations('DriverPage');

  return (
    <>
      <PageDescription
        description={t('description')}
        secondaryDescription={t('secondaryDescription')}
        testId={DRIVER_PAGE_DESCRIPTION}
      />
      <DriverRegisterForm />
    </>
  );
};

export default dynamic(() => Promise.resolve(InitialDriverRegistration), { ssr: false });
