'use client';
import { FC, PropsWithChildren } from 'react';

import './dropdown-button.css';

type TDropdownButton = {
  text: string;
  isOpen: boolean;
  onClick: () => void;
};

const DropdownButton: FC<PropsWithChildren<TDropdownButton>> = ({
  text,
  children,
  isOpen,
  onClick,
}) => (
  <div className='dropdown-button-container'>
    <div>
      <button type='button' className='dropdown-button-container__button' onClick={onClick}>
        {text}
      </button>
    </div>
    {isOpen && (
      <div x-show='open' className='dropdown-button-container__menu'>
        {children}
      </div>
    )}
  </div>
);

export default DropdownButton;
