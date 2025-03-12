import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

import addParamsToUrl from '@/shared/utils/client-side/add-params-to-url';

const useRedirect = () => {
  const locale = useLocale();
  const router = useRouter();

  const redirect = (url: string) => router.push(addParamsToUrl(url, { locale }));

  return redirect;
};

export default useRedirect;
