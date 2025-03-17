import Cookies from 'js-cookie';

import { DEFAULT_COOKIE_LIFETIME } from '@/shared/consts/cookie-settings';

export const getCookieValue = (name: string) => Cookies.get(name);

type TSetCookieValueArgs = {
  name: string;
  value: string;
  expires?: number | Date;
};

export const setCookieValue = ({
  name,
  value,
  expires = DEFAULT_COOKIE_LIFETIME,
}: TSetCookieValueArgs) => Cookies.set(name, value, { expires });
