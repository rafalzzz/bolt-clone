import { drawDetections } from '@/features/driver-registration/utils/start-facial-recognition';

import { TDetections } from '@/features/driver-registration/types';

type THandleCanvasDrawing = {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  detections: TDetections;
};

const covertCanvasToBlob = (canvas: HTMLCanvasElement): Promise<File> =>
  new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const filename = 'faceId.png';

        resolve(new File([blob], filename, { type: blob.type }));
      }

      reject(new Error('Failed to create blob from canvas.'));
    }, 'image/png');
  });

const getCanvasDrawing = async ({ video, canvas, detections }: THandleCanvasDrawing) => {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get canvas context.');
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  drawDetections(canvas, detections);

  return covertCanvasToBlob(canvas);
};

export default getCanvasDrawing;
