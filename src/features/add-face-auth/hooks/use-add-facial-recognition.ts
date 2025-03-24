import { useTranslations } from 'next-intl';
import type { Dispatch, SetStateAction, RefObject, MutableRefObject } from 'react';

import getCanvasDrawing from '@/features/add-face-auth/utils/get-canvas-drawing';
import { detectFaces } from '@/features/add-face-auth/utils/start-facial-recognition';
import stopStreamedVideo from '@/features/add-face-auth/utils/stop-streamed-video';
import displayToast from '@/shared/utils/client-side/display-toast';

import { ADD_FACIAL_RECOGNITION_ERROR } from '@/test-ids/add-facial-recognition-modal';

import { TDetections } from '@/features/driver-registration/types/detections';

type TUseAddFaceAuth = {
  intervalRef: MutableRefObject<NodeJS.Timeout | null>;
  setFile: Dispatch<SetStateAction<File | null>>;
};

const useAddFaceAuth = ({ intervalRef, setFile }: TUseAddFaceAuth) => {
  const t = useTranslations('AddFaceAuthError');

  const handleError = (error?: unknown) => {
    const text = error instanceof Error ? error.message : t('errorWhileAddingFaceRecognition');

    displayToast({ text });
  };

  const addFaceAuth = async (
    videoRef: RefObject<HTMLVideoElement>,
    canvasRef: RefObject<HTMLCanvasElement>,
  ) => {
    try {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      const { current: video } = videoRef;
      const { current: canvas } = canvasRef;

      if (!video || !canvas) {
        throw new Error('Video or canvas element not found');
      }

      const detections = (await detectFaces(video, {
        width: video.width,
        height: video.height,
      })) as TDetections;

      if (!detections) {
        return displayToast({
          text: t('faceNotFound'),
          testId: ADD_FACIAL_RECOGNITION_ERROR,
        });
      }

      const file = await getCanvasDrawing({ video, canvas, detections });

      setFile(file);
      stopStreamedVideo(videoRef);
    } catch (error) {
      handleError(error);
    }
  };

  return addFaceAuth;
};

export default useAddFaceAuth;
