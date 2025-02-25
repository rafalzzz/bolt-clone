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
export type TRegisterDriverFormData = Required<TDriverCompleteRegistrationFormSchema>;

export const enum TDriverEntityKeys {
  EMAIL = 'email',
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  PHONE_NUMBER = 'phone_number',
  CITY = 'city',
  PASSWORD = 'password',
  VEHICLE_NUMBER = 'vehicle_number',
  TERMS = 'terms',
}

export type TDriverEntity = {
  [TDriverEntityKeys.EMAIL]: string;
  [TDriverEntityKeys.PHONE_NUMBER]: string;
  [TDriverEntityKeys.FIRST_NAME]: string;
  [TDriverEntityKeys.CITY]: string;
  [TDriverEntityKeys.LAST_NAME]: string;
  [TDriverEntityKeys.VEHICLE_NUMBER]: string;
  [TDriverEntityKeys.PASSWORD]: string;
  [TDriverEntityKeys.TERMS]: boolean;
};
