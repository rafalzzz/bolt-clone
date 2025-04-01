import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import useServerAction from '@/shared/hooks/use-server-action';

import displayToast from '@/shared/utils/client-side/display-toast';

import { ADD_FACE_AUTH_ERROR_MESSAGE } from '@/test-ids/add-face-auth-page';

import uploadFaceImageAction from '../server-actions/upload-face-auth-image';

const useUploadFaceAuthImage = () => {
  const router = useRouter();
  const t = useTranslations('UploadFaceAuth');
  const { handleServerAction } = useServerAction();

  const onSuccess = (redirectPath: unknown) => {
    if (typeof redirectPath === 'string') {
      router.push(redirectPath);
    }
  };

  const uploadFaceAuthImage = async (file: File | null) => {
    if (!file) {
      return displayToast({
        text: t('photoIsNotAdded'),
        testId: ADD_FACE_AUTH_ERROR_MESSAGE,
      });
    }

    await handleServerAction({
      action: uploadFaceImageAction,
      onSuccess,
      actionArgs: file,
      errorMessage: {
        uniqueMessage: t('unknownError'),
        testId: ADD_FACE_AUTH_ERROR_MESSAGE,
      },
    });
  };

  return { uploadFaceAuthImage };
};

export default useUploadFaceAuthImage;
