import * as faceapi from '@vladmandic/face-api/dist/face-api.esm-nobundle.js';

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

type THandlePlay = {
  video: HTMLVideoElement | null;
  canvas: HTMLCanvasElement | null;
  intervalId: NodeJS.Timeout | null;
};

export const handlePlay = ({ video, canvas, intervalId }: THandlePlay) => {
  if (!video || !canvas) {
    return null;
  }

  const displaySize = {
    width: video.width,
    height: video.height,
  };
  // match the video dimensions to canvas
  faceapi.matchDimensions(canvas, displaySize);

  // clear the interval if it is present
  if (intervalId) {
    clearInterval(intervalId);
  }

  // every 400ms, detect faces and draw the detections onto the canvas
  intervalId = setInterval(async () => {
    const detection = await detectFaces(video as HTMLVideoElement, displaySize);

    drawDetections(canvas, detection || []);
  }, 400);
};
