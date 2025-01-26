import { ToastContentProps } from 'react-toastify';

import CloseSvg from '@/shared/svg/close-svg';

export const enum EIconColor {
  GREEN = 'green-500',
  RED = 'red-500',
}

type TCustomNotification = ToastContentProps<{
  icon: JSX.Element;
  iconColor: EIconColor;
  text: string;
}>;

export const NOTIFICATION_TIMEOUT = 5000;

const CustomNotifiacation = ({
  closeToast,
  data: { icon, iconColor, text },
}: TCustomNotification) => (
  <div
    role='alert'
    className='flex items-center w-full p-4 rounded-lg text-textColor bg-backgroundColor ring-1 ring-primaryColor transition-all'
  >
    <div
      className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 transition rounded-lg bg-backgroundColor text-${iconColor}`}
    >
      {icon}
    </div>
    <div className='ms-3 text-sm font-normal tracking-wide'>{text}</div>
    <button type='button' className='custom-close-button' aria-label='Close' onClick={closeToast}>
      <CloseSvg />
    </button>
  </div>
);

export default CustomNotifiacation;
