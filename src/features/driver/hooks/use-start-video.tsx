import * as tf from '@tensorflow/tfjs';
import { useTranslations } from 'next-intl';
import { useState, useRef, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import CustomNotifiacation, { EIconClassName } from '@/shared/components/custom-notification';

import loadFaceModels from '@/features/utils/load-face-models';
import startFacialRecognition from '@/features/utils/start-facial-recognition';
import startVideo from '@/features/utils/start-video';

import { DEFAULT_NOTIFICATION_PROPS } from '@/shared/consts/default-notification-props';

import WarningSvg from '@/shared/svg/warning-svg';

type TUseStartVideo = {
  videoWidth: number;
  videoHeight: number;
};

const useStartVideo = ({ videoWidth, videoHeight }: TUseStartVideo) => {
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);
  const [isVideoError, setIsVideoError] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const t = useTranslations('StartVideoError');

  const handleStartVideoError = useCallback(
    (error: string) => {
      const isCameraDisabled = error === 'Permission denied';
      const text = isCameraDisabled ? t('permissionDenied') : error;

      setIsVideoError(true);

      if (error.includes('Permission denied')) {
        toast(CustomNotifiacation, {
          data: {
            icon: <WarningSvg />,
            iconClassName: EIconClassName.WARNING,
            text,
          },
          ariaLabel: 'Registration error',
          ...DEFAULT_NOTIFICATION_PROPS,
        });
      }
    },
    [t],
  );

  const setupTensorFlow = useCallback(async () => {
    setIsVideoLoading(true);
    setIsVideoError(false);

    await tf.setBackend('webgl');
    await tf.ready();
    await loadFaceModels();

    startVideo({ video: videoRef.current, onError: handleStartVideoError });
    setIsVideoLoading(false);
  }, [handleStartVideoError]);

  const addVideoPlayListener = useCallback(() => {
    const videoPlayListener = () => {
      startFacialRecognition({
        videoWidth,
        videoHeight,
        video: videoRef.current,
        canvas: canvasRef.current,
        intervalRef,
      });
    };

    videoRef.current?.addEventListener('play', videoPlayListener);

    return videoPlayListener;
  }, [videoWidth, videoHeight]);

  const cleanup = (videoPlayListener: () => void) => {
    videoRef.current?.removeEventListener('play', videoPlayListener);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);

      intervalRef.current = null;
    }
  };

  useEffect(() => {
    setupTensorFlow();

    const videoPlayListener = addVideoPlayListener();

    return () => cleanup(videoPlayListener);
  }, [videoWidth, videoHeight, setupTensorFlow, addVideoPlayListener]);

  return { videoRef, canvasRef, isVideoLoading, isVideoError };
};

export default useStartVideo;
