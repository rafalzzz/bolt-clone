import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import CustomCenteredButton from '@/shared/components/custom-centered-button';

import { ENABLE_FACE_AUTH_MODAL_BUTTON } from '@/test-ids/add-face-auth-page';

const AddFaceAuthModal = dynamic(
  () => import('@/features/add-face-auth/components/add-face-auth-modal'),
  {
    ssr: false,
  },
);

const AddFaceAuthButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const t = useTranslations('AddFaceAuthPage');

  return (
    <>
      {isVisible && (
        <AddFaceAuthModal
          isVisible={isVisible}
          onCancel={() => {
            setIsVisible(false);
          }}
        />
      )}
      <CustomCenteredButton
        text={t('showFaceAuthModal')}
        isLoading={false}
        testId={ENABLE_FACE_AUTH_MODAL_BUTTON}
        buttonProps={{
          type: 'button',
          onClick: () => setIsVisible((prevState) => !prevState),
        }}
      />
    </>
  );
};

export default dynamic(() => Promise.resolve(AddFaceAuthButton), { ssr: false });
