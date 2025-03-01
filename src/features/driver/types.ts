import type {
  WithFaceLandmarks,
  FaceDetection,
  FaceLandmarks68,
} from '@vladmandic/face-api/dist/face-api.esm-nobundle.js';
import { type JWTPayload } from 'jose';
import type { Dispatch, SetStateAction } from 'react';

import { TDriverCompleteRegistrationFormSchema } from '@/features/driver/schemas/driver-complete-registration-form-schema';

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

export type TDriverCompleteRegistration = {
  tokenPayload: JWTPayload;
};

export type TDriverRegistrationTokenPayload = Record<EDriverRegistrationTokenPayloadKeys, string>;

export type TCompleteDriverRegistrationFormData = Required<TDriverCompleteRegistrationFormSchema>;

export type TEncryptedCompleteDriverRegistrationFormData = Omit<
  TCompleteDriverRegistrationFormData,
  'repeatPassword' | 'file'
>;

export const enum TDriverEntityKeys {
  EMAIL = 'email',
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  PHONE_NUMBER = 'phone_number',
  PHONE_NUMBER_HASH = 'phone_number_hash',
  CITY = 'city',
  PASSWORD = 'password',
  CAR_NUMBER = 'car_number',
  CAR_NUMBER_HASH = 'car_number_hash',
  CAR_BRAND = 'car_brand',
  CAR_MODEL = 'car_model',
  CAR_COLOR = 'car_color',
  TERMS = 'terms',
}

export type TDriverEntity = {
  [TDriverEntityKeys.EMAIL]: string;
  [TDriverEntityKeys.FIRST_NAME]: string;
  [TDriverEntityKeys.LAST_NAME]: string;
  [TDriverEntityKeys.PHONE_NUMBER]: string;
  [TDriverEntityKeys.PHONE_NUMBER_HASH]: string;
  [TDriverEntityKeys.CITY]: string;
  [TDriverEntityKeys.PASSWORD]: string;
  [TDriverEntityKeys.CAR_NUMBER]: string;
  [TDriverEntityKeys.CAR_NUMBER_HASH]: string;
  [TDriverEntityKeys.CAR_BRAND]: string;
  [TDriverEntityKeys.CAR_MODEL]: string;
  [TDriverEntityKeys.CAR_COLOR]: string;
};
