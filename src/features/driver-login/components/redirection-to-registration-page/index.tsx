import { useLocale, useTranslations } from 'next-intl';

import Redirection from '@/shared/components/custom-redirection';

const RedirectionToRegistrationPage = () => {
  const locale = useLocale();
  const t = useTranslations('RedirectionToRegistrationPage');

  return (
    <Redirection
      text={t('dontHaveAnAccount')}
      redirectionText={t('register')}
      redirectionUrl={`/${locale}/driver`}
    />
  );
};

export default RedirectionToRegistrationPage;
