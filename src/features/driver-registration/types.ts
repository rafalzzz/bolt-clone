import type {
  WithFaceLandmarks,
  FaceDetection,
  FaceLandmarks68,
} from '@vladmandic/face-api/dist/face-api.esm-nobundle.js';
import type { Dispatch, SetStateAction } from 'react';

import { TDriverCompleteRegistrationFormSchema } from '@/features/driver-registration/schemas/driver-complete-registration-form-schema';

import { EDriverRegistrationTokenPayloadKeys } from '@/features/driver-registration/enums/driver-registration-form-keys';

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

export type TDriverRegistrationTokenPayload = Record<EDriverRegistrationTokenPayloadKeys, string>;

export type TDriverCompleteRegistration = {
  tokenPayload: TDriverRegistrationTokenPayload;
};

export type TCompleteDriverRegistrationFormData = Omit<
  TDriverCompleteRegistrationFormSchema & TDriverRegistrationTokenPayload,
  'repeatPassword'
>;

export type TInitialDriverEntityData = Omit<TCompleteDriverRegistrationFormData, 'password'>;
