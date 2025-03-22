import { toast } from 'react-toastify';

import CustomNotifiacation, { EIconColor } from '@/shared/components/custom-notification';

import { EToastType } from '@/shared/enums/toast-type';

import { DEFAULT_NOTIFICATION_PROPS } from '@/shared/consts/default-notification-props';
import SuccessSvg from '@/shared/svg/success-svg';
import WarningSvg from '@/shared/svg/warning-svg';

type TDisplayToastArgs = {
  text: string;
  type?: EToastType;
  testId?: string;
};

const getToastIconWithColor = (type: EToastType) => {
  switch (type) {
    case EToastType.SUCCESS:
      return {
        icon: <SuccessSvg />,
        iconColor: EIconColor.GREEN,
      };
    case EToastType.ERROR:
      return {
        icon: <WarningSvg />,
        iconColor: EIconColor.RED,
      };
    default:
      throw new Error('Unhandled toast type');
  }
};

const displayToast = ({ type = EToastType.ERROR, text, testId }: TDisplayToastArgs) => {
  const { icon, iconColor } = getToastIconWithColor(type);

  toast(CustomNotifiacation, {
    data: {
      icon,
      iconColor,
      text,
      testId,
    },
    ariaLabel: text,
    ...DEFAULT_NOTIFICATION_PROPS,
  });
};

export default displayToast;
