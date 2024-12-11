import dynamic from 'next/dynamic';
import { FC, PropsWithChildren, useState } from 'react';

type TDropdownButton = {
  text: string;
};

const DropdownButton: FC<PropsWithChildren<TDropdownButton>> = ({ text, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative inline-block'>
      <div>
        <button
          type='button'
          className='flex items-center h-11 p-2 border-2 border-gray-300 rounded-md 
          text-sm font-bold bg-white hover:bg-gray-200 hover:border-white
          text-gray-600 dark:border-gray-700 dark:text-gray-300 dark:bg-gray-800
          dark:hover:bg-gray-700 dark:hover:text-white transition'
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          {text}
        </button>
      </div>
      {isOpen && (
        <div
          x-show='open'
          className='absolute right-0 mt-2 py-1 text-gray-500 bg-white rounded-lg shadow-xl min-w-max'
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(DropdownButton), { ssr: false });
