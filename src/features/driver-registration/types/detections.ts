import type {
  WithFaceLandmarks,
  FaceDetection,
  FaceLandmarks68,
} from '@vladmandic/face-api/dist/face-api.esm-nobundle.js';

export type TDetections =
  | WithFaceLandmarks<
      {
        detection: FaceDetection;
      },
      FaceLandmarks68
    >
  | never[];
