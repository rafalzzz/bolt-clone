import { ToastContentProps } from 'react-toastify';

import CloseSvg from '@/shared/svg/close-svg';

import './notification.scss';

export const enum EIconClassName {
  SUCCESS = 'success',
  WARNING = 'warning',
}

type TCustomNotification = ToastContentProps<{
  icon: JSX.Element;
  iconClassName: EIconClassName;
  text: string;
}>;

export const NOTIFICATION_TIMEOUT = 5000;

const CustomNotifiacation = ({
  closeToast,
  data: { icon, iconClassName, text },
}: TCustomNotification) => (
  <div className='notification' role='alert'>
    <div className={`notification__icon notification__${iconClassName}-icon`}>{icon}</div>
    <div className='notification__message'>{text}</div>
    <button
      type='button'
      className='notification__close-button'
      aria-label='Close'
      onClick={closeToast}
    >
      <CloseSvg />
    </button>
  </div>
);

export default CustomNotifiacation;
