import { useLocale, useTranslations } from 'next-intl';

import Redirection from '@/shared/components/custom-redirection';

const RedirectionToLoginPage = () => {
  const locale = useLocale();
  const t = useTranslations('RedirectionToLoginPage');

  return (
    <Redirection
      text={t('haveAnAccount')}
      redirectionText={t('login')}
      redirectionUrl={`/${locale}/driver/login`}
    />
  );
};

export default RedirectionToLoginPage;
