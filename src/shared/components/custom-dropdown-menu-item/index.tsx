import type { FC } from 'react';

type TCustomDropdownMenuItem = {
  text: string;
  onClick: () => void;
  testId?: string;
};

const CustomDropdownMenuItem: FC<TCustomDropdownMenuItem> = ({ text, onClick, testId }) => (
  <button
    type='button'
    role='menu-item'
    className='block px-4 py-2 w-full menu-item'
    aria-label={text}
    onClick={onClick}
    data-testid={testId}
  >
    {text}
  </button>
);

export default CustomDropdownMenuItem;
