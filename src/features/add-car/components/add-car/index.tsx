'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import AddCarForm from '@/features/add-car/components/add-car-form';
import PageDescription from '@/shared/components/page-description';

import { ADD_CAR_PAGE_DESCRIPTION } from '@/test-ids/add-car-page';

const AddCar = () => {
  const t = useTranslations('AddCarPage');

  return (
    <>
      <PageDescription
        description={t('description')}
        secondaryDescription={t('secondaryDescription')}
        testId={ADD_CAR_PAGE_DESCRIPTION}
      />
      <AddCarForm />
    </>
  );
};

export default dynamic(() => Promise.resolve(AddCar), { ssr: false });
