import Cookies from 'js-cookie';

import { DEFAULT_COOKIE_LIFETIME } from '@/shared/consts/cookie-settings';

type TSetCookieValueParams = {
  name: string;
  value: string;
  expires?: number | Date;
};

export const getCookieValue = (name: string) => Cookies.get(name);

export const setCookieValue = ({
  name,
  value,
  expires = DEFAULT_COOKIE_LIFETIME,
}: TSetCookieValueParams) => Cookies.set(name, value, { expires });
