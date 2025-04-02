import type { NextRequest } from 'next/server';

import { generateDriverRegistrationToken } from '@/features/driver-registration/utils/generate-driver-registration-token';
import handleUniqueColumnsCheck from '@/features/driver-registration/utils/handle-unique-columns-check';
import sendDriverRegistrationEmail from '@/features/driver-registration/utils/send-driver-registration-email';
import createHash from '@/shared/utils/server-side/create-hash';
import encryptSensitiveData from '@/shared/utils/server-side/encrypt-sensitive-data';
import getApiLocale from '@/shared/utils/server-side/get-api-locale';
import getApiTranslations from '@/shared/utils/server-side/get-api-translations';
import handleRequestError from '@/shared/utils/server-side/handle-request-error';
import sendResponse from '@/shared/utils/server-side/send-response';

import { TDriverRegistrationFormSchema } from '@/features/driver-registration/schemas/driver-registration-form-schema';

import { EDriverRegistrationFormKeys } from '@/features/driver-registration/enums/driver-registration-form-keys';
import { EEmailTranslationKeys } from '@/features/driver-registration/enums/email-translation-keys';

import { TDriverRegistrationTokenPayload } from '@/features/driver-registration/types/driver-registration';

const keysToEncrypt = [EDriverRegistrationFormKeys.PHONE_NUMBER];
const keysToOmit = [EDriverRegistrationFormKeys.RULES];

export async function POST(request: NextRequest) {
  const locale = getApiLocale(request);

  try {
    const t = await getApiTranslations(locale);
    const data = await request.json();

    const { email } = data;
    const phoneNumberHash = createHash(data[EDriverRegistrationFormKeys.PHONE_NUMBER]);

    await handleUniqueColumnsCheck({
      phoneNumberHash,
      email,
      takenEmailMessage: t('takenEmail'),
      takenPhoneNumberMessage: t('takenPhoneNumber'),
    });

    const encryptedData = encryptSensitiveData<
      TDriverRegistrationFormSchema,
      TDriverRegistrationTokenPayload
    >({ data, keysToEncrypt, keysToOmit });

    const token = await generateDriverRegistrationToken({ ...encryptedData, phoneNumberHash });

    await sendDriverRegistrationEmail({
      lang: locale,
      to: email,
      token,
      translations: {
        [EEmailTranslationKeys.HEADER]: t('emailTitle'),
        [EEmailTranslationKeys.GREETING]: t('emailGreeting'),
        [EEmailTranslationKeys.TEXT]: t('emailText'),
        [EEmailTranslationKeys.BUTTON_TEXT]: t('emailButtonText'),
        [EEmailTranslationKeys.FOOTER]: t('emailFooter'),
        [EEmailTranslationKeys.BOLT_COPY_TEAM]: t('emailBoltCopyTeam'),
        [EEmailTranslationKeys.SEND_EMAIL_ERROR]: t('sendEmailError'),
      },
    });

    return sendResponse({ status: 200 });
  } catch (error: unknown) {
    return handleRequestError(error);
  }
}
