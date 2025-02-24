import type {
  WithFaceLandmarks,
  FaceDetection,
  FaceLandmarks68,
} from '@vladmandic/face-api/dist/face-api.esm-nobundle.js';
import { type JWTPayload } from 'jose';
import type { Dispatch, SetStateAction } from 'react';

import { TDriverCompleteRegistrationFormSchema } from '@/features/driver/schemas/driver-complete-registration-form-schema';
import { TDriverRegistrationFormSchema } from '@/features/driver/schemas/driver-registration-form-schema';

export type TAddFacialRecognitionOnSubmit = {
  file: File;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export type TDetections =
  | WithFaceLandmarks<
      {
        detection: FaceDetection;
      },
      FaceLandmarks68
    >
  | never[];

export type TDriverCompleteRegistration = {
  tokenPayload: JWTPayload;
};

export type TDriverRegistrationTokenPayload = Omit<TDriverRegistrationFormSchema, 'rules'>;

export type TDriverRegistrationFormData = TDriverCompleteRegistrationFormSchema &
  TDriverRegistrationTokenPayload;

export type TDriverItem = Omit<TDriverRegistrationFormData, 'repeatPassword'>;
