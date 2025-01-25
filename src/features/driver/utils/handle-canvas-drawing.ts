import { type UseFormSetValue } from 'react-hook-form';

import { drawDetections } from '@/features/driver/utils/start-facial-recognition';

import { TDriverCompleteRegisterFormSchema } from '@/features/driver/schemas/driver-complete-register-form-schema';

import { EDriverCompleteRegisterFormKeys } from '@/features/driver/enums/driver-complete-register-form-keys';

import { type TDetections } from '@/features/driver/types';

type THandleCanvasDrawing = {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  detections: TDetections;
  setValue: UseFormSetValue<TDriverCompleteRegisterFormSchema>;
  handleError: (error?: unknown) => void;
};

const handleCanvasDrawing = async ({
  video,
  canvas,
  detections,
  setValue,
  handleError,
}: THandleCanvasDrawing) => {
  try {
    const ctx = canvas.getContext('2d');

    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) throw new Error('Failed to create blob from canvas.');

      const filename = `${Date.now()}.png`;
      const file = new File([blob], filename, { type: blob.type });

      setValue(EDriverCompleteRegisterFormKeys.FILE, file);
    });

    drawDetections(canvas, detections);
  } catch (error) {
    handleError(error);
  }
};

export default handleCanvasDrawing;
