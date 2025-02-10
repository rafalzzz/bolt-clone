import type { FC } from 'react';
import { ToastContentProps } from 'react-toastify';

import CustomCloseButton from '@/shared/components/custom-close-button';

export const enum EIconColor {
  GREEN = 'green-500',
  RED = 'red-500',
}

type TCustomNotification = ToastContentProps<{
  icon: JSX.Element;
  iconColor: EIconColor;
  text: string;
  testId?: string;
}>;

export const NOTIFICATION_TIMEOUT = 5000;

const CustomNotifiacation: FC<TCustomNotification> = ({
  data: { icon, iconColor, text, testId },
  closeToast,
}) => (
  <div
    role='alert'
    className='flex items-center w-full p-4 rounded-lg text-textColor bg-backgroundColor ring-1 ring-primaryColor transition-all'
  >
    <div
      className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 transition rounded-lg bg-backgroundColor text-${iconColor}`}
    >
      {icon}
    </div>
    <div className='ms-3 text-sm font-normal tracking-wide' data-testid={testId}>
      {text}
    </div>
    <CustomCloseButton onClick={closeToast} />
  </div>
);

export default CustomNotifiacation;
