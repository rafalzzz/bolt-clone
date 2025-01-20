import * as tf from '@tensorflow/tfjs';
import { useState, useRef, useCallback, useEffect } from 'react';

import loadFaceModels from '@/features/utils/load-face-models';
import startFacialRecognition from '@/features/utils/start-facial-recognition';
import startVideo from '@/features/utils/start-video';

type TUseAddFacialRecognition = {
  videoWidth: number;
  videoHeight: number;
};

const useAddFacialRecognition = ({ videoWidth, videoHeight }: TUseAddFacialRecognition) => {
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const setupTensorFlow = async () => {
    await tf.setBackend('webgl');
    await tf.ready();
    await loadFaceModels();

    startVideo(videoRef.current);
    setIsVideoLoading(false);
  };

  const addVideoPlayListener = useCallback(() => {
    const videoPlayListener = () => {
      startFacialRecognition({
        video: videoRef.current,
        videoWidth,
        videoHeight,
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
  }, [addVideoPlayListener, videoWidth, videoHeight]);

  return { videoRef, canvasRef, isVideoLoading };
};

export default useAddFacialRecognition;
