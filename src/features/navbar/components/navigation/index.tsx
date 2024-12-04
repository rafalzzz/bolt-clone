import NavButton from '../nav-button';

import NAV_BUTTONS from '../../consts/nav-buttons';

const Navigation = () => (
  <ul className='hidden md:flex flex-row space-x-4'>
    {NAV_BUTTONS.map(({ href, text }) => (
      <NavButton key={text} href={href} text={text} />
    ))}
  </ul>
);

export default Navigation;
