import {
  set as CookieSet,
} from 'js-cookie';

import {
  cookieSetTypedef,
  Icookie,
  IcookiesValue,
} from '@types';

import { stringIsCookieName } from '@helpers';

/**
 * Nadaj wartość ciasteczku
 * @param name Nazwa ciasteczka
 * @param value Wartość ciasteczka
 * @param options Atrybuty ciasteczka
 */
const cookieSet: cookieSetTypedef = (
  name: Icookie['name'] | string,
  value: IcookiesValue,
  options?: Icookie['options'],
): void => {
  if (!stringIsCookieName(name)) return;
  console.log(value);

  CookieSet(name, value, options);
};

export { cookieSet };
