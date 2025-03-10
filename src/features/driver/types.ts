import type {
  WithFaceLandmarks,
  FaceDetection,
  FaceLandmarks68,
} from '@vladmandic/face-api/dist/face-api.esm-nobundle.js';
import type { Dispatch, SetStateAction } from 'react';

import { TDriverCompleteRegistrationFormSchema } from '@/features/driver/schemas/driver-complete-registration-form-schema';

import { EDriverEntityKeys } from '@/features/driver/enums/driver-entity-keys';
import { EDriverRegistrationTokenPayloadKeys } from '@/features/driver/enums/driver-registration-form-keys';

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

export type TCompleteDriverRegistrationFormData = Required<TDriverCompleteRegistrationFormSchema>;

export type TEncryptedCompleteDriverRegistrationFormData = Omit<
  TCompleteDriverRegistrationFormData,
  'repeatPassword' | 'file'
>;

export type TDriverEntity = {
  [EDriverEntityKeys.EMAIL]: string;
  [EDriverEntityKeys.FIRST_NAME]: string;
  [EDriverEntityKeys.LAST_NAME]: string;
  [EDriverEntityKeys.PHONE_NUMBER]: string;
  [EDriverEntityKeys.PHONE_NUMBER_HASH]: string;
  [EDriverEntityKeys.CITY]: string;
  [EDriverEntityKeys.PASSWORD]: string;
  [EDriverEntityKeys.CAR_NUMBER]: string;
  [EDriverEntityKeys.CAR_NUMBER_HASH]: string;
  [EDriverEntityKeys.CAR_BRAND]: string;
  [EDriverEntityKeys.CAR_MODEL]: string;
  [EDriverEntityKeys.CAR_COLOR]: string;
};
