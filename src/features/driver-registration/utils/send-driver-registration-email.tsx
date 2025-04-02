import getDriverRegistrationEmailTemplate, {
  TEmailTranslations,
} from '@/features/driver-registration/utils/get-driver-registration-email-template';
import sendEmail from '@/shared/utils/server-side/email';

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
    sendEmailError: translations.sendEmailError,
  });

  if (sendEmailError) {
    throw sendEmailError;
  }
};

export default sendDriverRegistrationEmail;
