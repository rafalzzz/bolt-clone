import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type TSendEmail = {
  email: string;
  subject: string;
  html: string;
};

export async function sendEmail({ email, subject, html }: TSendEmail) {
  return await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject,
    html,
  });
}
