import { useTranslations } from 'next-intl';

import useServerAction from '@/shared/hooks/use-server-action';
import useToastWithRedirection from '@/shared/hooks/use-toast-with-redirection';

import displayToast from '@/shared/utils/client-side/display-toast';

import {
  ADD_FACE_AUTH_ERROR_MESSAGE,
  ADD_FACE_AUTH_SUCCESS_MESSAGE,
} from '@/test-ids/add-face-auth-page';

import uploadFaceImageAction from '../server-actions/upload-face-auth-image';

const useUploadFaceAuthImage = () => {
  const t = useTranslations('UploadFaceAuth');
  const toastWithRedirection = useToastWithRedirection();
  const { state, handleServerAction } = useServerAction();

  const onSuccess = (redirectPath: unknown) => {
    if (typeof redirectPath === 'string') {
      toastWithRedirection({
        text: t('addFaceAuthSuccess'),
        redirectPath,
        testId: ADD_FACE_AUTH_SUCCESS_MESSAGE,
      });
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

  return { state, uploadFaceAuthImage };
};

export default useUploadFaceAuthImage;
