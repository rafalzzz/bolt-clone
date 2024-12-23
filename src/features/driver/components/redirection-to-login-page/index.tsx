import Link from 'next/link';

import './redirection-to-login-page.scss';

const RedirectionToLoginPage = () => (
  <footer className='redirection-to-login-page'>
    <span>Already have an account?</span>
    <Link
      // TODO - add url to login page
      href='#'
      className='redirection-to-login-page__hyperlink'
    >
      Log in &#8599;
    </Link>
  </footer>
);

export default RedirectionToLoginPage;
