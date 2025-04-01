import { useRouter } from 'next/navigation';

import displayToast from '@/shared/utils/client-side/display-toast';

import { EToastType } from '@/shared/enums/toast-type';

import { DEFAULT_TOAST_TIMEOUT } from '@/shared/consts/default-notification-props';

type TToastWithRedirectionArgs = {
  text: string;
  testId: string;
  redirectPath: string;
  type?: EToastType;
};

const useToastWithRedirection = () => {
  const router = useRouter();

  const toastWithRedirection = ({
    text,
    testId,
    redirectPath,
    type = EToastType.SUCCESS,
  }: TToastWithRedirectionArgs) => {
    displayToast({
      type,
      text,
      testId,
    });

    setTimeout(() => router.push(redirectPath), DEFAULT_TOAST_TIMEOUT);
  };

  return toastWithRedirection;
};

export default useToastWithRedirection;
