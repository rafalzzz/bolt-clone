'use client';

import type { RefObject } from 'react';

import { TFCWithChildren } from '@/shared/types/fc-with-children';

type TDropdownButton = {
  text: string;
  buttonClassName: string;
  isOpen: boolean;
  onClick: () => void;
  ref?: RefObject<HTMLDivElement>;
  showArrow?: boolean;
  ariaLabel?: string;
  testId?: string;
};

const DropdownButton: TFCWithChildren<TDropdownButton> = ({
  text,
  buttonClassName,
  isOpen,
  children,
  onClick,
  ref,
  showArrow = false,
  ariaLabel,
  testId,
}) => (
  <div className='relative inline-block' ref={ref}>
    <div>
      <button
        type='button'
        className={buttonClassName}
        onClick={onClick}
        aria-label={ariaLabel}
        data-testid={testId}
        aria-expanded={isOpen}
      >
        {text}
        {showArrow && (
          <svg
            className='ml-1'
            height='15'
            width='15'
            viewBox='0 0 20 20'
            aria-hidden='true'
            focusable='false'
          >
            <path
              d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z'
              fill='currentColor'
            ></path>
          </svg>
        )}
      </button>
    </div>
    {isOpen && (
      <div
        x-show='open'
        className='absolute right-0 text-buttonTextColor bg-backgroundColor border border-primaryColor px-0 py-2 mt-2 text-sm rounded-lg shadow-xl min-w-max'
      >
        {children}
      </div>
    )}
  </div>
);

export default DropdownButton;
