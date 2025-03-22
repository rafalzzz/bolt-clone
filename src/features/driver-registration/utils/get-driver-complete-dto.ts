import { TDriverCompleteRegistrationFormSchema } from '@/features/driver-registration/schemas/driver-complete-registration-form-schema';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver-registration/enums/driver-complete-registration-form-keys';
import { EDriverRegistrationTokenPayloadKeys } from '@/features/driver-registration/enums/driver-registration-form-keys';

import { TDriverRegistrationTokenPayload } from '@/features/driver-registration/types/driver-registration';

const getDriverCompleteDto = (
  formValues: TDriverCompleteRegistrationFormSchema,
  tokenPayload: TDriverRegistrationTokenPayload,
) => ({
  [EDriverRegistrationTokenPayloadKeys.EMAIL]:
    tokenPayload[EDriverRegistrationTokenPayloadKeys.EMAIL],
  [EDriverRegistrationTokenPayloadKeys.PHONE_NUMBER]:
    tokenPayload[EDriverRegistrationTokenPayloadKeys.PHONE_NUMBER],
  [EDriverRegistrationTokenPayloadKeys.PHONE_NUMBER_HASH]:
    tokenPayload[EDriverRegistrationTokenPayloadKeys.PHONE_NUMBER_HASH],
  [EDriverRegistrationTokenPayloadKeys.CITY]:
    tokenPayload[EDriverRegistrationTokenPayloadKeys.EMAIL],
  [EDriverCompleteRegistrationFormKeys.FIRST_NAME]:
    formValues[EDriverCompleteRegistrationFormKeys.FIRST_NAME],
  [EDriverCompleteRegistrationFormKeys.LAST_NAME]:
    formValues[EDriverCompleteRegistrationFormKeys.LAST_NAME],
  [EDriverCompleteRegistrationFormKeys.PASSWORD]:
    formValues[EDriverCompleteRegistrationFormKeys.PASSWORD],
});

export default getDriverCompleteDto;
