'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { ToastContainer } from 'react-toastify';

import { createClient } from '@/lib/supabase/browser-client';

import CenteredPageDescription from '@/shared/components/centered-page-description';
import CustomCenteredButton from '@/shared/components/custom-centered-button';

import {
  CLIENT_LOGIN_PAGE_DESCRIPTION,
  LOGIN_WITH_FACEBOOK_BUTTON,
  LOGIN_WITH_GMAIL_BUTTON,
} from '@/test-ids/client-login-page';

const ClientLogin = () => {
  const t = useTranslations('ClientLoginPage');

  const supabase = createClient();

  return (
    <div>
      <ToastContainer />
      <CenteredPageDescription
        description={t('description')}
        secondaryDescription={t('secondaryDescription')}
        testId={CLIENT_LOGIN_PAGE_DESCRIPTION}
      />
      <CustomCenteredButton
        text={t('loginWithFacebook')}
        additionalClassNames='max-w-[300px] mb-8'
        isLoading={false}
        testId={LOGIN_WITH_FACEBOOK_BUTTON}
        buttonProps={{
          type: 'button',
          // TODO - handle login callback
          onClick: () => supabase.auth.signInWithOAuth({ provider: 'facebook' }),
        }}
      />
      <CustomCenteredButton
        text={t('loginWithGmail')}
        isLoading={false}
        testId={LOGIN_WITH_GMAIL_BUTTON}
        buttonProps={{
          type: 'button',
          onClick: () => console.log('Facebook'),
        }}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(ClientLogin), { ssr: false });
