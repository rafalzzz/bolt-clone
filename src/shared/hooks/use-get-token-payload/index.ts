import { type JWTPayload } from 'jose';
import { useTranslations } from 'next-intl';
import { useState, useCallback, useEffect } from 'react';

import displayWarningToast from '@/shared/utils/display-warning-toast';
import { decryptJwtToken } from '@/shared/utils/server-side/json-web-token';
import { encodeSecretKey } from '@/shared/utils/server-side/secret-key';

import { JWT_TOKEN_ERROR } from '@/test-ids/driver-registration-complete';

type TUseGetTokenPayload = Record<'token' | 'secretKey', string | undefined>;

const useGetTokenPayload = ({ token, secretKey }: TUseGetTokenPayload) => {
  const [payload, setPayload] = useState<JWTPayload | null>(null);

  const t = useTranslations('JwtTokenErrors');

  const getTokenPayload = useCallback(async () => {
    if (!token || !secretKey) {
      return displayWarningToast({
        text: t('missingTokenOrSecretKey'),
        ariaLabel: JWT_TOKEN_ERROR,
      });
    }

    const tokenPayload = await decryptJwtToken({
      token,
      secretKey: encodeSecretKey(secretKey),
    });

    if ('error' in tokenPayload) {
      return displayWarningToast({ text: t(tokenPayload.error), ariaLabel: JWT_TOKEN_ERROR });
    }

    setPayload(tokenPayload);
  }, [secretKey, token, t]);

  useEffect(() => {
    getTokenPayload();
  }, [getTokenPayload]);

  return payload;
};

export default useGetTokenPayload;
