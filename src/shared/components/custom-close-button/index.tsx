import type { FC } from 'react';

import CloseSvg from '@/shared/svg/close-svg';

type TCustomCloseButton = {
  onClick: () => void;
};

const CustomCloseButton: FC<TCustomCloseButton> = ({ onClick }) => (
  <button
    type='button'
    className='ms-auto -mx-1.5 -my-1.5 rounded-lg inline-flex justify-center items-center focus:ring-2 p-1.5 h-8 w-8 text-textColor bg-backgroundColor hover:bg-quinaryColor transition'
    aria-label='Close'
    onClick={onClick}
  >
    <CloseSvg />
  </button>
);

export default CustomCloseButton;
