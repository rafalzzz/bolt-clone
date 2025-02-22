import { toast } from 'react-toastify';

import CustomNotifiacation, { EIconColor } from '@/shared/components/custom-notification';

import { DEFAULT_NOTIFICATION_PROPS } from '@/shared/consts/default-notification-props';

import WarningSvg from '@/shared/svg/warning-svg';

import { TToastParams } from '@/shared/types/toast-params';

const displayWarningToast = ({ text, testId }: TToastParams) => {
  toast(CustomNotifiacation, {
    data: {
      icon: <WarningSvg />,
      iconColor: EIconColor.RED,
      text,
      testId,
    },
    ariaLabel: text,
    ...DEFAULT_NOTIFICATION_PROPS,
  });
};

export default displayWarningToast;
