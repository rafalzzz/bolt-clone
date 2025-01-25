import { toast } from 'react-toastify';

import CustomNotifiacation, { EIconColor } from '@/shared/components/custom-notification';

import { DEFAULT_NOTIFICATION_PROPS } from '@/shared/consts/default-notification-props';

import SuccessSvg from '@/shared/svg/success-svg';

const displaySuccessToast = (text: string, ariaLabel: string) => {
  toast(CustomNotifiacation, {
    data: {
      icon: <SuccessSvg />,
      iconColor: EIconColor.GREEN,
      text,
    },
    ariaLabel,
    ...DEFAULT_NOTIFICATION_PROPS,
  });
};

export default displaySuccessToast;
