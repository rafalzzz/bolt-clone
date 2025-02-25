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

    const omitKey = keysToOmit?.includes(keyTyped);

    if (omitKey) {
      return acc;
    }

    const encryptKey = keysToEcrypt.includes(keyTyped);

    if (encryptKey && typeof value === 'string') {
      return { ...acc, [key]: encryptText(value) };
    }

    return { ...acc, [key]: value };
  }, {} as EndodedObject);

export default encryptSensitiveData;
