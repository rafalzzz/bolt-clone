'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import AddFaceAuthButton from '@/features/add-face-auth/components/add-face-auth-button';
import CenteredPageDescription from '@/shared/components/centered-page-description';

import { ADD_FACE_AUTH_DESCRIPTION } from '@/test-ids/add-face-auth-page';

const AddFaceAuth = () => {
  const t = useTranslations('AddFaceAuthPage');

  return (
    <div>
      <CenteredPageDescription
        description={t('description')}
        secondaryDescription={t('secondaryDescription')}
        testId={ADD_FACE_AUTH_DESCRIPTION}
      />
      <AddFaceAuthButton />
    </div>
  );
};

export default dynamic(() => Promise.resolve(AddFaceAuth), { ssr: false });
