import type { FC } from 'react';

type TCustomDropdownMenuItem = {
  text: string;
  onClick: () => void;
};

const CustomDropdownMenuItem: FC<TCustomDropdownMenuItem> = ({ text, onClick }) => {
  return (
    <button
      type='button'
      role='menu-item'
      className='custom-dropdown-menu-item'
      aria-label={text}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomDropdownMenuItem;
