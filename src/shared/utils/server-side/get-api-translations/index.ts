import { createTranslator } from 'next-intl';

const getApiTranslations = async (locale: string) => {
  const messages = (await import(`@/translations/${locale}-api.json`)).default;
  return createTranslator({ locale, messages });
};

export default getApiTranslations;
