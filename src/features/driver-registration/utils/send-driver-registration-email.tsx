import getDriverRegistrationEmailTemplate from '@/features/driver-registration/utils/get-driver-registration-email-template';
import sendEmail from '@/shared/utils/server-side/email';

import { EEmailTranslationKeys } from '@/features/driver-registration/enums/email-translation-keys';

import { TEmailTranslations } from '@/features/driver-registration/types/email-translations';

type TSendDriverRegistrationEmailArgs = {
  lang: string;
  to: string;
  token: string;
  translations: TEmailTranslations;
};

const sendDriverRegistrationEmail = async ({
  lang,
  to,
  token,
  translations,
}: TSendDriverRegistrationEmailArgs) => {
  const html = getDriverRegistrationEmailTemplate({ lang, token, translations });

  const { error: sendEmailError } = await sendEmail({
    to,
    subject: translations.header,
    html,
    sendEmailError: translations[EEmailTranslationKeys.SEND_EMAIL_ERROR],
  });

  if (sendEmailError) {
    throw sendEmailError;
  }
};

export default sendDriverRegistrationEmail;
