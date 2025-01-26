import Link from 'next/link';

const RedirectionToLoginPage = () => (
  <footer className='flex items-center justify-start mt-8 text-center text-textColor dark:text-textColor transition'>
    <span>Already have an account?</span>
    <Link
      // TODO - add url to login page
      href='#'
      className='text-primaryColor no-underline hover:underline cursor-pointer dark:text-secondaryColor ml-1 transition'
    >
      Log in &#8599;
    </Link>
  </footer>
);

export default RedirectionToLoginPage;
