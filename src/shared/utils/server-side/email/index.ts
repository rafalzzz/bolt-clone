import { ReactNode } from 'react';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type TSendEmail = {
  to: string;
  subject: string;
  emailTemplate?: ReactNode;
};

const sendEmail = async ({ to, subject, emailTemplate }: TSendEmail) =>
  await resend.emails.send({
    // Default email for testing purposes
    from: 'onboarding@resend.dev',
    to,
    subject,
    react: emailTemplate,
  });

export default sendEmail;
