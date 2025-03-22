import { useLocale, useTranslations } from 'next-intl';

import Redirection from '@/shared/components/custom-redirection';

import addParamsToUrl from '@/shared/utils/client-side/add-params-to-url';

import { REGISTER_DRIVER } from '@/shared/consts/routes';

const RedirectionToRegistrationPage = () => {
  const locale = useLocale();
  const t = useTranslations('RedirectionToRegistrationPage');

  return (
    <Redirection
      text={t('dontHaveAnAccount')}
      redirectionText={t('register')}
      redirectionUrl={addParamsToUrl(REGISTER_DRIVER, { locale })}
    />
  );
};

export default RedirectionToRegistrationPage;
