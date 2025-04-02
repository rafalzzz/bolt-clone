import nodemailer from 'nodemailer';

type TSendEmailArgs = Record<'to' | 'subject' | 'html' | 'sendEmailError', string>;

const sendEmail = async ({ to, subject, html, sendEmailError }: TSendEmailArgs) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    });

    const message = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(message);

    const isSuccess = info.accepted.length && !info.rejected.length;

    if (!isSuccess) {
      return { error: sendEmailError };
    }

    return { error: null };
  } catch (error: unknown) {
    return { error };
  }
};

export default sendEmail;
