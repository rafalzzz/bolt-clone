import { useLocale, useTranslations } from 'next-intl';

import Redirection from '@/shared/components/custom-redirection';

import addParamsToUrl from '@/shared/utils/client-side/add-params-to-url';

import { LOGIN_DRIVER } from '@/shared/consts/routes';

const RedirectionToLoginPage = () => {
  const locale = useLocale();
  const t = useTranslations('RedirectionToLoginPage');

  return (
    <Redirection
      text={t('haveAnAccount')}
      redirectionText={t('login')}
      redirectionUrl={addParamsToUrl(LOGIN_DRIVER, { locale })}
    />
  );
};

export default RedirectionToLoginPage;
