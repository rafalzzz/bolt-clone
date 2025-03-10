import { TDriverCompleteRegistrationFormSchema } from '@/features/driver-registration/schemas/driver-complete-registration-form-schema';

import { TDriverRegistrationTokenPayload } from '@/features/driver-registration/types';

type TGetDriverFormDataParams = {
  tokenPayload: TDriverRegistrationTokenPayload;
  formValues: TDriverCompleteRegistrationFormSchema;
};

const getDriverFormData = ({ tokenPayload, formValues }: TGetDriverFormDataParams) => {
  const formData = new FormData();

  const { email, phoneNumber, phoneNumberHash, city } = tokenPayload;

  const driverDto = {
    email,
    phoneNumber,
    phoneNumberHash,
    city,
    ...formValues,
  };

  Object.entries(driverDto).forEach(([key, value]) => {
    if (value instanceof File) {
      return formData.append(key, value, value.name);
    }

    formData.append(key, String(value));
  });

  return formData;
};

export default getDriverFormData;
