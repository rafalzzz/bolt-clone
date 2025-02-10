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
      className='block px-4 py-2 text-textColor hover:bg-primaryColor hover:text-buttonTextColor dark:text-darkButtonTextColor dark:bg-darkBackgroundColor dark:hover:bg-secondaryColor dark:hover:text-darkTextColor font-sans transition w-full'
      aria-label={text}
      onClick={onClick}
      data-testid={testId}
    >
      {text}
    </button>
  );
};

export default CustomDropdownMenuItem;
