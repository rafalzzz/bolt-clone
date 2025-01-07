'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import DriverCompleteRegisterForm from '@/features/driver/components/driver-complete-register-form';
import PageDescription from '@/shared/components/page-description';

const DriverCompleteRegistration = () => {
  const t = useTranslations('DriverCompletePage');

  return (
    <>
      <PageDescription
        description={t('description')}
        secondaryDescription={t('secondaryDescription')}
      />
      <DriverCompleteRegisterForm />
    </>
  );
};

export default dynamic(() => Promise.resolve(DriverCompleteRegistration), { ssr: false });
