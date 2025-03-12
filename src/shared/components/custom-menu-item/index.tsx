import type { FC } from 'react';

type TCustomMenuItem = {
  text: string;
  onClick: () => void;
  className?: string;
  testId?: string;
};

const CustomMenuItem: FC<TCustomMenuItem> = ({
  text,
  onClick,
  className = 'block px-4 py-2 w-full menu-item',
  testId,
}) => (
  <button
    type='button'
    role='menu-item'
    className={className}
    aria-label={text}
    onClick={onClick}
    data-testid={testId}
  >
    {text}
  </button>
);

export default CustomMenuItem;
