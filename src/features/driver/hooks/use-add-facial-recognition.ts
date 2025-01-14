'use client';

import * as tf from '@tensorflow/tfjs';
import * as faceapi from '@vladmandic/face-api/dist/face-api.esm-nobundle.js';
import { useState, useRef, useEffect } from 'react';

const useAddFacialRecognition = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    tf.setBackend('webgl')
      .then(() => tf.ready().then(() => loadModels()))
      .then(() => startVideo())
      .finally(() => {
        setIsVideoLoading(false);
      });

    videoRef.current?.addEventListener('play', () => {
      handlePlay();
    });

    // cleanup
    return () => {
      videoRef.current?.removeEventListener('play', () => {
        handlePlay();
      });

      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    ]);
  };

  const startVideo = () => {
    if (videoRef.current != null) {
      navigator.mediaDevices
        .getUserMedia({ video: {}, audio: false })
        .then(
          (stream: MediaStream) =>
            ((videoRef.current as HTMLVideoElement).srcObject = new MediaStream(
              stream.getVideoTracks(),
            )),
        )
        .catch((err) => console.error(err));
    }
  };

  const handlePlay = () => {
    if (!videoRef.current || !canvasRef.current) {
      return null;
    }
    // init the canvas
    const canvas = canvasRef.current;
    const video = videoRef.current;

    const displaySize = {
      width: video.width,
      height: video.height,
    };
    // match the video dimensions to canvas
    faceapi.matchDimensions(canvas, displaySize);

    // clear the interval if it is present
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    // every 400ms, detect faces and draw the detections onto the canvas
    intervalId.current = setInterval(async () => {
      const detection = await detectFaces(videoRef.current as HTMLVideoElement, displaySize);

      drawDetections(canvas, detection || []);
    }, 400);
  };

  const detectFaces = async (
    video: HTMLVideoElement,
    displaySize: {
      width: number;
      height: number;
    },
  ) => {
    const detection = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks();
    const resizedDetection = faceapi.resizeResults(detection, displaySize);

    return resizedDetection;
  };

  const drawDetections = (
    canvas: HTMLCanvasElement,
    detections:
      | faceapi.WithFaceLandmarks<
          {
            detection: faceapi.FaceDetection;
          },
          faceapi.FaceLandmarks68
        >
      | never[],
  ) => {
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);

    faceapi.draw.drawDetections(canvas, detections);
    faceapi.draw.drawFaceLandmarks(canvas, detections);
  };

  return { videoRef, canvasRef, isVideoLoading };
};

export default useAddFacialRecognition;
