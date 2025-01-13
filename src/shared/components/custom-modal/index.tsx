'use client';

import { useTranslations } from 'next-intl';
import { FC, PropsWithChildren, ReactNode } from 'react';

import useCustomModal from '@/shared/hooks/use-custom-modal';

import './custom-modal.scss';

type TCustomModal = {
  title: ReactNode;
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
  okButtonText?: string;
  cancelButtonText?: string;
};

const CustomModal: FC<PropsWithChildren<TCustomModal>> = ({
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
    <div className='custom-modal__background ' ref={modalRef}>
      <div className='custom-modal__wrapper'>
        <div className='custom-modal__content'>
          <div className='custom-modal__header'>
            <h3 className='custom-modal__header__title'>{title}</h3>
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
          <div className='custom-modal__body'>{children}</div>
          <div className='custom-modal__footer'>
            <button
              data-modal-hide='default-modal'
              type='button'
              className='custom-modal__footer__cancel-button default-cancel-button-colors'
              onClick={onCancel}
            >
              {cancelButtonText ?? t('cancelButtonText')}
            </button>
            <button
              type='button'
              className='custom-modal__footer__accept-button default-button-colors'
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
