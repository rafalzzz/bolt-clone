'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import CustomFormButton from '@/shared/components/custom-form-button';

import { ENABLE_FACE_AUTH_MODAL } from '@/test-ids/add-face-auth-page';

const AddFaceAuthButton = () => {
  const [showModal, setShowModal] = useState(false);

  const t = useTranslations('AddFaceAuthPage');

  console.log({ showModal });

  return (
    <div className='flex justify-center items-center'>
      <CustomFormButton
        text={t('showFaceAuthModal')}
        isLoading={false}
        testId={ENABLE_FACE_AUTH_MODAL}
        additionalClassNames='max-w-[300px]'
        buttonProps={{
          type: 'button',
          onClick: () => setShowModal((prevState) => !prevState),
        }}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(AddFaceAuthButton), { ssr: false });
