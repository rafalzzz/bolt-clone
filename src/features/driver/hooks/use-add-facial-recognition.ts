import * as tf from '@tensorflow/tfjs';
import { useState, useRef, useEffect } from 'react';

import loadFaceModels from '@/features/utils/load-face-models';
import startFacialRecognition from '@/features/utils/start-facial-recognition';
import startVideo from '@/features/utils/start-video';

const useAddFacialRecognition = () => {
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

  const setupTensorFlow = async () => {
    await tf.setBackend('webgl');
    await tf.ready();
    await loadFaceModels();

    startVideo(videoRef.current);
    setIsVideoLoading(false);
  };

  const addVideoPlayListener = () => {
    const videoPlayListener = () => {
      startFacialRecognition({
        video: videoRef.current,
        canvas: canvasRef.current,
        intervalId: intervalId.current,
      });
    };

    videoRef.current?.addEventListener('play', videoPlayListener);
    return videoPlayListener;
  };

  const cleanup = (videoPlayListener: () => void) => {
    videoRef.current?.removeEventListener('play', videoPlayListener);
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  };

  useEffect(() => {
    setupTensorFlow();
    const videoPlayListener = addVideoPlayListener();

    return () => cleanup(videoPlayListener);
  }, []);

  return { videoRef, canvasRef, isVideoLoading };
};

export default useAddFacialRecognition;
