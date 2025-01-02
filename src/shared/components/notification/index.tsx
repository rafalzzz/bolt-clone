import { useCallback, useEffect, ReactNode, useRef } from 'react';

import CloseSvg from '@/shared/svg/close-svg';
import SuccessSvg from '@/shared/svg/success-svg';

import './notification.scss';

type TNotification = {
  showNotification: boolean;
  text: ReactNode;
};

const enum ENotificationMethod {
  ADD = 'add',
  REMOVE = 'remove',
}

const NOTIFICATION_TIMEOUT = 5000;
const SHOW_NOTIFICATION_CLASS_NAME = 'notification--visible';

const Notifiacation = ({ showNotification, text }: TNotification) => {
  const notificationRef = useRef<HTMLDivElement>(null);

  const handleNotification = (method: ENotificationMethod) => {
    if (notificationRef.current) {
      notificationRef.current.classList[method](SHOW_NOTIFICATION_CLASS_NAME);
    }
  };

  const displayNotification = useCallback(() => {
    if (showNotification) {
      handleNotification(ENotificationMethod.ADD);

      setTimeout(() => handleNotification(ENotificationMethod.REMOVE), NOTIFICATION_TIMEOUT);
    }
  }, [showNotification]);

  useEffect(displayNotification, [displayNotification]);

  return (
    <div ref={notificationRef} className='notification' role='alert'>
      <div className='notification__check-icon'>
        <SuccessSvg />
      </div>
      <div className='notification__message'>{text}</div>
      <button
        type='button'
        className='notification__close-button'
        aria-label='Close'
        onClick={() => handleNotification(ENotificationMethod.REMOVE)}
      >
        <CloseSvg />
      </button>
    </div>
  );
};

export default Notifiacation;
