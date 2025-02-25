import { ReactNode } from 'react';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type TSendEmail = {
  to: string;
  subject: string;
  emailTemplate?: ReactNode;
};

export async function sendEmail({ to, subject, emailTemplate }: TSendEmail) {
  return await resend.emails.send({
    // Default email for testing purposes
    from: 'onboarding@resend.dev',
    to: to + '!!!!',
    subject,
    react: emailTemplate,
  });
}
