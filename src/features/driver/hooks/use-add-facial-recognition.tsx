import { useTranslations } from 'next-intl';
import type { Dispatch, SetStateAction, RefObject, MutableRefObject } from 'react';
import type { UseFormSetValue } from 'react-hook-form';

import handleCanvasDrawing from '@/features/driver/utils/handle-canvas-drawing';
import { detectFaces } from '@/features/driver/utils/start-facial-recognition';
import stopStreamedVideo from '@/features/driver/utils/stop-streamed-video';
import displayWarningToast from '@/shared/utils/display-warning-toast';

import { TDriverCompleteRegisterFormSchema } from '@/features/driver/schemas/driver-complete-register-form-schema';

import type { TDetections } from '@/features/driver/types';

type TUseAddFacialRecognition = {
  intervalRef: MutableRefObject<NodeJS.Timeout | null>;
  setIsAddFacialRecognitionModalEnabled: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<TDriverCompleteRegisterFormSchema>;
};

const ERROR_ARIA_LABEL = 'Add facial recognition error';

const useAddFacialRecognition = ({ intervalRef, setValue }: TUseAddFacialRecognition) => {
  const t = useTranslations('AddFacialRecognitionError');

  const handleError = (error?: unknown) => {
    const text = error instanceof Error ? error.message : t('errorWhileAddingFaceRecognition');

    displayWarningToast({ text, ariaLabel: ERROR_ARIA_LABEL });
  };

  const addFacialRecognition = async (
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
        return displayWarningToast({ text: t('faceNotFound'), ariaLabel: ERROR_ARIA_LABEL });
      }

      await handleCanvasDrawing({ video, canvas, detections, setValue, handleError });

      stopStreamedVideo(videoRef);
    } catch (error) {
      handleError(error);
    }
  };

  return addFacialRecognition;
};

export default useAddFacialRecognition;
