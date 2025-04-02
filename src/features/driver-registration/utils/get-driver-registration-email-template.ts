import isDevelopmentEnvironment from '@/shared/utils/is-development-environment';

const PROTOCOL = isDevelopmentEnvironment() ? 'http' : 'https';

type TTranslationKeys =
  | 'header'
  | 'greeting'
  | 'text'
  | 'buttonText'
  | 'footer'
  | 'boltCopyTeam'
  | 'sendEmailError';

export type TEmailTranslations = Record<TTranslationKeys, string>;

type TGetDriverRegistrationEmailTemplateArgs = {
  lang: string;
  token: string;
  translations: TEmailTranslations;
};

const getDriverRegistrationEmailTemplate = ({
  lang,
  token,
  translations: { header, greeting, text, buttonText, boltCopyTeam, footer },
}: TGetDriverRegistrationEmailTemplateArgs): string => {
  const baseUrl = process.env.DOMAIN_URL
    ? `${PROTOCOL}://${process.env.DOMAIN_URL}/en/driver/complete/`
    : '';

  const link = `${baseUrl}${token}`;

  return `
  <!DOCTYPE html>
  <html lang="${lang}">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="Content-Language" content="${lang}">
      <title>${header}</title>
      <style>
        a.button:hover {
          background-color: #6366f1 !important;
        }
      </style>
    </head>
    <body style="margin:0; padding:0; background-color:#ffffff; font-family: Roboto, sans-serif;">
      <table align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center">
            <table style="max-width: 500px; width: 100%; margin: 0 auto; padding: 20px;">
              <tr>
                <td style="text-align: center;">
                  <h1 style="font-size: 24px; font-weight: 900; margin-bottom: 30px;">BoltCopy</h1>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="font-size: 16px; color: #374151;">${greeting}!</p>
                  <p style="font-size: 16px; color: #374151;">
                    ${text}
                  </p>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 20px 0;">
                  <a
                    href="${link}"
                    class="button"
                    style="
                      background-color: #4338ca;
                      border-radius: 10px;
                      color: #ffffff !important;
                      font-size: 16px;
                      text-decoration: none;
                      display: inline-block;
                      padding: 12px 24px;
                      font-weight: bold;
                    "
                    target="_blank"
                  >
                    ${buttonText}
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="font-size: 16px; color: #374151;">
                    ${footer},<br />
                    ${boltCopyTeam}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;
};

export default getDriverRegistrationEmailTemplate;
