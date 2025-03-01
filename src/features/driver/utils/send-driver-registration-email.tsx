import CompleteRegistrationEmailTemplate from '@/features/driver/components/complete-registration-email-template';

import getErrorMessage from '@/shared/utils/common/get-error-message';
import sendEmail from '@/shared/utils/server-side/email';

const EMAIL_TITLE = 'Welcome to BoltCopy!';

const sendDriverRegistrationEmail = async (to: string, token: string) => {
  const { error: sendEmailError } = await sendEmail({
    to,
    subject: EMAIL_TITLE,
    emailTemplate: <CompleteRegistrationEmailTemplate token={token} />,
  });

  if (sendEmailError) {
    throw new Error(getErrorMessage(sendEmailError));
  }
};

export default sendDriverRegistrationEmail;
