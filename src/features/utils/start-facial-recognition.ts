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
  canvas: HTMLCanvasElement | null;
  intervalId: NodeJS.Timeout | null;
};

const RECOGNIZE_FACE_INTERVAL = 200;

const detectFaces = async (video: HTMLVideoElement, displaySize: TDisplaySize) => {
  const detection = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks();

  if (!detection) {
    return null;
  }

  const resizedDetection = faceapi.resizeResults(detection, displaySize);

  return resizedDetection;
};

const drawDetections = (canvas: HTMLCanvasElement, detections: TDetections) => {
  const context = canvas.getContext('2d');
  if (!context) return;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 0;

  faceapi.draw.drawDetections(canvas, detections);
  faceapi.draw.drawFaceLandmarks(canvas, detections);
};

const startFacialRecognition = ({ video, canvas, intervalId }: TStartFacialRecognition) => {
  if (!video || !canvas) {
    return null;
  }

  const displaySize = {
    width: video.width,
    height: video.height,
  };

  faceapi.matchDimensions(canvas, displaySize);

  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(async () => {
    const detection = await detectFaces(video as HTMLVideoElement, displaySize);

    drawDetections(canvas, detection || []);
  }, RECOGNIZE_FACE_INTERVAL);
};

export default startFacialRecognition;
