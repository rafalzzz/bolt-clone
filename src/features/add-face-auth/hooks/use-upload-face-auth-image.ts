import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import useServerAction from '@/shared/hooks/use-server-action';

import displayToast from '@/shared/utils/client-side/display-toast';

import {
  ADD_FACE_AUTH_ERROR_MESSAGE,
  ADD_FACE_AUTH_SUCCESS_MESSAGE,
} from '@/test-ids/add-face-auth-page';

import { EToastType } from '@/shared/enums/toast-type';

import uploadFaceImageAction from '../server-actions/upload-face-auth-image';

const useUploadFaceAuthImage = () => {
  const t = useTranslations('UploadFaceAuth');
  const { handleServerAction } = useServerAction();

  const onSuccess = useCallback(
    () =>
      displayToast({
        type: EToastType.SUCCESS,
        text: t('addFaceAuthSuccess'),
        testId: ADD_FACE_AUTH_SUCCESS_MESSAGE,
      }),
    [t],
  );

  const uploadFaceAuthImage = useCallback(
    async (file: File | null) => {
      if (!file) {
        return displayToast({
          text: t('photoIsNotAdded'),
          testId: ADD_FACE_AUTH_ERROR_MESSAGE,
        });
      }

      const response = await handleServerAction({
        action: uploadFaceImageAction,
        actionArgs: file,
        errorMessage: {
          uniqueMessage: t('unknownError'),
          testId: ADD_FACE_AUTH_ERROR_MESSAGE,
        },
      });

      if (response?.success) {
        onSuccess();
      }
    },
    [t, onSuccess, handleServerAction],
  );

  return { uploadFaceAuthImage };
};

export default useUploadFaceAuthImage;
