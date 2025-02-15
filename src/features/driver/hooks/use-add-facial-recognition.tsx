import { useTranslations } from 'next-intl';
import type { Dispatch, SetStateAction, RefObject, MutableRefObject } from 'react';
import type { UseFormSetValue } from 'react-hook-form';

import getCanvasDrawing from '@/features/driver/utils/get-canvas-drawing';
import { detectFaces } from '@/features/driver/utils/start-facial-recognition';
import stopStreamedVideo from '@/features/driver/utils/stop-streamed-video';
import displayWarningToast from '@/shared/utils/display-warning-toast';

import { TDriverCompleteRegistrationFormSchema } from '@/features/driver/schemas/driver-complete-registration-form-schema';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver/enums/driver-complete-registration-form-keys';

import type { TDetections } from '@/features/driver/types';

type TUseAddFacialRecognition = {
  intervalRef: MutableRefObject<NodeJS.Timeout | null>;
  setIsAddFacialRecognitionModalEnabled: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<TDriverCompleteRegistrationFormSchema>;
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
        return displayWarningToast({
          text: t('faceNotFound'),
          ariaLabel: t('faceNotFound'),
        });
      }

      const file = await getCanvasDrawing({ video, canvas, detections });

      setValue(EDriverCompleteRegistrationFormKeys.FILE, file);
      stopStreamedVideo(videoRef);
    } catch (error) {
      handleError(error);
    }
  };

  return addFacialRecognition;
};

export default useAddFacialRecognition;
