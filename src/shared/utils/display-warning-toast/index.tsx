import { toast } from 'react-toastify';

import CustomNotifiacation, { EIconClassName } from '@/shared/components/custom-notification';

import { DEFAULT_NOTIFICATION_PROPS } from '@/shared/consts/default-notification-props';

import WarningSvg from '@/shared/svg/warning-svg';

const displayWarningToast = (text: string, ariaLabel: string) => {
  toast(CustomNotifiacation, {
    data: {
      icon: <WarningSvg />,
      iconClassName: EIconClassName.WARNING,
      text,
    },
    ariaLabel,
    ...DEFAULT_NOTIFICATION_PROPS,
  });
};

export default displayWarningToast;
