import { useTranslations } from 'next-intl';

import DriverRegisterForm from '@/features/driver/components/driver-register-form';
import PageDescription from '@/shared/components/page-description';

const DriverPage = () => {
  const t = useTranslations('DriverPage');

  return (
    <main className='flex flex-wrap items-center justify-center mx-auto w-full p-0 max-w-5xl py-3'>
      <div className='h-auto w-full flex p-0 lg:flex-row flex-col'>
        <PageDescription
          description={t('description')}
          secondaryDescription={t('secondaryDescription')}
        />
        <DriverRegisterForm />
      </div>
    </main>
  );
};

export default DriverPage;
