import { TDriverCompleteRegistrationFormSchema } from '@/features/driver-registration/schemas/driver-complete-registration-form-schema';

import { EDriverRegistrationTokenPayloadKeys } from '@/features/driver-registration/enums/driver-registration-form-keys';

export type TDriverRegistrationTokenPayload = Record<EDriverRegistrationTokenPayloadKeys, string>;

export type TDriverCompleteRegistration = {
  tokenPayload: TDriverRegistrationTokenPayload;
};

export type TCompleteDriverRegistrationFormData = Omit<
  TDriverCompleteRegistrationFormSchema & TDriverRegistrationTokenPayload,
  'repeatPassword'
>;

export type TInitialDriverEntityData = Omit<TCompleteDriverRegistrationFormData, 'password'>;
