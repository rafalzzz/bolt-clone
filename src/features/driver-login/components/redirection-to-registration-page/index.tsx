import Link from 'next/link';
import { useTranslations } from 'next-intl';

const RedirectionToRegistrationPage = () => {
  const t = useTranslations('RedirectionToRegistrationPage');

  return (
    <footer className='flex items-center justify-start mt-8 text-center text-textColor dark:text-textColor transition'>
      <span>{t('dontHaveAnAccount')}</span>
      <Link
        // TODO - add url to login page
        href='#'
        className='text-primaryColor no-underline hover:underline cursor-pointer dark:text-secondaryColor ml-1 transition'
      >
        {t('register')} &#8599;
      </Link>
    </footer>
  );
};

export default RedirectionToRegistrationPage;
