'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import DriverRegistrationForm from '@/features/driver/components/driver-registration-form';
import PageDescription from '@/shared/components/page-description';

import { DRIVER_REGISTRATION_PAGE_DESCRIPTION } from '@/test-ids/driver-registration-page';

const DriverRegistration = () => {
  const t = useTranslations('DriverRegistrationPage');

  return (
    <>
      <PageDescription
        description={t('description')}
        secondaryDescription={t('secondaryDescription')}
        testId={DRIVER_REGISTRATION_PAGE_DESCRIPTION}
      />
      <DriverRegistrationForm />
    </>
  );
};

export default dynamic(() => Promise.resolve(DriverRegistration), { ssr: false });
