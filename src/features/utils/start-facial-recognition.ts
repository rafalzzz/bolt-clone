import * as faceapi from '@vladmandic/face-api/dist/face-api.esm-nobundle.js';

type TDisplaySize = {
  width: number;
  height: number;
};

type TDetections =
  | faceapi.WithFaceLandmarks<
      {
        detection: faceapi.FaceDetection;
      },
      faceapi.FaceLandmarks68
    >
  | never[];

type TStartFacialRecognition = {
  video: HTMLVideoElement | null;
  videoWidth: number;
  videoHeight: number;
  canvas: HTMLCanvasElement | null;
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
};

const RECOGNIZE_FACE_INTERVAL = 200;

const detectFaces = async (video: HTMLVideoElement, displaySize: TDisplaySize) => {
  const detection = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks();

  if (!detection) {
    return null;
  }

  return faceapi.resizeResults(detection, displaySize);
};

const drawDetections = (canvas: HTMLCanvasElement, detections: TDetections) => {
  const context = canvas.getContext('2d');
  if (!context) return;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 0;

  faceapi.draw.drawDetections(canvas, detections);
  faceapi.draw.drawFaceLandmarks(canvas, detections);
};

const startFacialRecognition = ({
  video,
  videoWidth,
  videoHeight,
  canvas,
  intervalRef,
}: TStartFacialRecognition) => {
  if (!video || !canvas) {
    return;
  }

  const displaySize = {
    width: videoWidth,
    height: videoHeight,
  };

  canvas.width = videoWidth;
  canvas.height = videoHeight;

  faceapi.matchDimensions(canvas, displaySize);

  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }

  intervalRef.current = setInterval(async () => {
    const detection = await detectFaces(video, displaySize);
    drawDetections(canvas, detection || []);
  }, RECOGNIZE_FACE_INTERVAL);
};

export default startFacialRecognition;
