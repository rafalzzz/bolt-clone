import { setBackend, ready } from '@tensorflow/tfjs';
import { useTranslations } from 'next-intl';
import { useState, useRef, useCallback, useEffect } from 'react';

import loadFaceModels from '@/features/driver/utils/load-face-models';
import { startFacialRecognition } from '@/features/driver/utils/start-facial-recognition';
import startVideo from '@/features/driver/utils/start-video';
import stopStreamedVideo from '@/features/driver/utils/stop-streamed-video';
import displayWarningToast from '@/shared/utils/display-warning-toast';
import isDevelopmentEnvironment from '@/shared/utils/is-development-environment';

type TUseHandleVideo = {
  videoWidth: number;
  videoHeight: number;
};

const PERMISSION_DENIED_ERROR = 'Permission denied';

const useHandleVideo = ({ videoWidth, videoHeight }: TUseHandleVideo) => {
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);
  const [isVideoError, setIsVideoError] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const t = useTranslations('AddFacialRecognitionError');

  const handleStartVideoError = useCallback(
    (error: string) => {
      const isCameraDisabled = error === PERMISSION_DENIED_ERROR;
      const text = isCameraDisabled ? t('permissionDenied') : error;

      setIsVideoError(true);
      displayWarningToast({ text, ariaLabel: PERMISSION_DENIED_ERROR });
    },
    [t],
  );

  const setupTensorFlow = useCallback(async () => {
    setIsVideoLoading(true);
    setIsVideoError(false);

    await setBackend(isDevelopmentEnvironment() ? 'cpu' : 'webgl');
    await ready();
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

  useEffect(() => {
    return () => stopStreamedVideo(videoRef);
  }, []);

  return { videoRef, canvasRef, intervalRef, isVideoLoading, isVideoError };
};

export default useHandleVideo;
