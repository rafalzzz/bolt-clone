import type { FC } from 'react';

type TCustomDropdownMenuItem = {
  text: string;
  onClick: () => void;
  testId?: string;
};

const CustomDropdownMenuItem: FC<TCustomDropdownMenuItem> = ({ text, onClick, testId }) => {
  return (
    <button
      type='button'
      role='menu-item'
      className='custom-dropdown-menu-item'
      aria-label={text}
      onClick={onClick}
      data-testid={testId}
    >
      {text}
    </button>
  );
};

export default CustomDropdownMenuItem;
