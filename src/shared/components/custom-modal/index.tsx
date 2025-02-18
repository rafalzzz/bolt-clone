import { useTranslations } from 'next-intl';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import CustomCloseButton from '@/shared/components/custom-close-button';

import useCustomModal from '@/shared/hooks/use-custom-modal';

import { TFCWithChildren } from '@/shared/types/fc-with-children';

type TCustomModal = {
  title: ReactNode;
  isVisible: boolean;
  onCancel: () => void;
  okButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  cancelButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  okButtonText?: string;
  cancelButtonText?: string;
  modalTestId?: string;
  okButtonTestId?: string;
  cancelButtonTestId?: string;
};

const CustomModal: TFCWithChildren<TCustomModal> = ({
  title,
  isVisible,
  children,
  onCancel,
  okButtonText,
  cancelButtonText,
  okButtonProps = {},
  cancelButtonProps = {},
  modalTestId,
  okButtonTestId,
  cancelButtonTestId,
}) => {
  const t = useTranslations('CustomModal');
  const { modalRef } = useCustomModal({ isVisible });

  return (
    <div
      ref={modalRef}
      data-testid={modalTestId}
      className='fixed top-0 right-0 left-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full duration-150 ease-in-out bg-modalBackgroundColor transition'
    >
      <div className='relative p-4 w-full max-w-3xl max-h-full'>
        <div className='relative bg-backgroundColor rounded-lg shadow'>
          <div className='flex items-center justify-between p-4 md:p-5 rounded-t border-b border-primaryColor'>
            <h3 className='text-xl font-semibold text-textColor'>{title}</h3>
            <CustomCloseButton onClick={onCancel} />
          </div>
          <div className='p-4 md:p-5 space-y-4 text-textColor'>{children}</div>
          <div className='flex items-center justify-end p-4 md:p-5 rounded-b border-t border-primaryColor'>
            <button
              type='button'
              data-modal-hide='default-modal'
              className='py-2.5 px-5 text-sm font-medium rounded-lg focus:z-10 secondary-button'
              data-testid={cancelButtonTestId}
              onClick={onCancel}
              {...cancelButtonProps}
            >
              {cancelButtonText ?? t('cancelButtonText')}
            </button>
            <button
              type='button'
              className='ms-3 font-medium rounded-lg text-sm px-5 py-2.5 text-center primary-button'
              data-testid={okButtonTestId}
              {...okButtonProps}
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
