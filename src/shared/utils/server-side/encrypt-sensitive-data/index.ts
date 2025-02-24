import { encryptText } from '../../encryption/encrypt-text';

type TEncryptSensitivityData<InitialObject extends Record<keyof InitialObject, unknown>> = {
  data: InitialObject;
  keysToEcrypt: (keyof InitialObject)[];
  keysToOmit?: (keyof InitialObject)[];
};

const encryptSensitiveData = <
  InitialObject extends Record<keyof InitialObject, unknown>,
  EndodedObject extends Record<keyof EndodedObject, unknown> = InitialObject,
>({
  data,
  keysToEcrypt,
  keysToOmit,
}: TEncryptSensitivityData<InitialObject>): EndodedObject =>
  Object.entries(data).reduce((acc, [key, value]) => {
    const keyTyped = key as keyof InitialObject;

    if (
      !keysToEcrypt.includes(keyTyped) ||
      keysToOmit?.includes(keyTyped) ||
      typeof value !== 'string'
    ) {
      return acc;
    }

    return { ...acc, [key]: encryptText(value) };
  }, {} as EndodedObject);

export default encryptSensitiveData;
