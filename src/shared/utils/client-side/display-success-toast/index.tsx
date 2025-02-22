import { toast } from 'react-toastify';

import CustomNotifiacation, { EIconColor } from '@/shared/components/custom-notification';

import { DEFAULT_NOTIFICATION_PROPS } from '@/shared/consts/default-notification-props';

import SuccessSvg from '@/shared/svg/success-svg';

import { TToastParams } from '@/shared/types/toast-params';

const displaySuccessToast = ({ text, testId }: TToastParams) => {
  toast(CustomNotifiacation, {
    data: {
      icon: <SuccessSvg />,
      iconColor: EIconColor.GREEN,
      text,
      testId,
    },
    ariaLabel: text,
    ...DEFAULT_NOTIFICATION_PROPS,
  });
};

export default displaySuccessToast;
