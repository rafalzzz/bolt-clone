import { setBackend, ready } from '@tensorflow/tfjs';
import { useTranslations } from 'next-intl';
import { useState, useRef, useCallback, useEffect } from 'react';

import loadFaceModels from '@/features/add-face-auth/utils/load-face-models';
import { startFacialRecognition } from '@/features/add-face-auth/utils/start-facial-recognition';
import startVideo from '@/features/add-face-auth/utils/start-video';
import stopStreamedVideo from '@/features/add-face-auth/utils/stop-streamed-video';
import displayToast from '@/shared/utils/client-side/display-toast';
import isDevelopmentEnvironment from '@/shared/utils/is-development-environment';

import { ADD_FACIAL_RECOGNITION_ERROR } from '@/test-ids/add-facial-recognition-modal';

type TUseHandleVideo = {
  videoWidth: number;
  videoHeight: number;
};

const PERMISSION_DENIED_ERROR = 'Permission denied';
const TF_BACKEND_NAME = isDevelopmentEnvironment() ? 'cpu' : 'webgl';

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
      displayToast({
        text,
        testId: ADD_FACIAL_RECOGNITION_ERROR,
      });
    },
    [t],
  );

  const setupTensorFlow = useCallback(async () => {
    setIsVideoLoading(true);
    setIsVideoError(false);

    await setBackend(TF_BACKEND_NAME);
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
