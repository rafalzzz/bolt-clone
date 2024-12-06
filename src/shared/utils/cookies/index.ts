import Cookies from 'js-cookie';

type TSetCookieValueParams = {
  name: string;
  value: string;
  expires?: number | Date;
};

export const getCookieValue = (name: string) => Cookies.get(name);

export const setCookieValue = ({ name, value, expires }: TSetCookieValueParams) =>
  Cookies.set(name, value, { expires });
