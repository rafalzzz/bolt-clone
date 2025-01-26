import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import useCustomModal from '@/shared/hooks/use-custom-modal';

import { TFCWithChildren } from '@/shared/types/fc-with-children';

type TCustomModal = {
  title: ReactNode;
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
  okButtonText?: string;
  cancelButtonText?: string;
};

const CustomModal: TFCWithChildren<TCustomModal> = ({
  title,
  isVisible,
  children,
  okButtonText,
  cancelButtonText,
  onOk,
  onCancel,
}) => {
  const t = useTranslations('CustomModal');
  const { modalRef } = useCustomModal({ isVisible });

  return (
    <div
      ref={modalRef}
      className='fixed top-0 right-0 left-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full duration-150 ease-in-out bg-modalBackgroundColor dark:bg-modalBackgroundColor transition'
    >
      <div className='relative p-4 w-full max-w-3xl max-h-full'>
        <div className='relative bg-backgroundColor rounded-lg shadow dark:bg-backgroundColor'>
          <div className='flex items-center justify-between p-4 md:p-5 rounded-t border-b border-primaryColor dark:border-primaryColor'>
            <h3 className='text-xl font-semibold text-textColor dark:text-textColor'>{title}</h3>
            <button type='button' className='custom-close-button' onClick={onCancel}>
              <svg className='w-3 h-3' fill='none' viewBox='0 0 14 14'>
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
            </button>
          </div>
          <div className='p-4 md:p-5 space-y-4 text-textColor dark:text-textColor'>{children}</div>
          <div className='flex items-center justify-end p-4 md:p-5 rounded-b border-t border-primaryColor dark:border-primaryColor'>
            <button
              type='button'
              data-modal-hide='default-modal'
              className='py-2.5 px-5 text-sm font-medium rounded-lg focus:z-10 default-cancel-button-colors'
              onClick={onCancel}
            >
              {cancelButtonText ?? t('cancelButtonText')}
            </button>
            <button
              type='button'
              className='ms-3 font-medium rounded-lg text-sm px-5 py-2.5 text-center default-button-colors'
              onClick={onOk}
            >
              {okButtonText ?? t('okButtonText')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
