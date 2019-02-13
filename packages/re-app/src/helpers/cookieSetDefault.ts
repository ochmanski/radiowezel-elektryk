import {
  IcookieSetDefault,
  cookieSetDefaultTypedef,
  Icookie,
  cookieSetLoopDefaultTypedef,
} from '@types';

import {
  cookiesDefault,
  cookieGetSafe,
} from '@helpers';

import { set as CookieSet } from 'js-cookie';

/**
 * Nadaj domyślną wartość ciasteczku
 * @param cookieName Nazwa ciasteczka
 * @param force Czy nadpisać ciasteczko jeśli ma wartość inną od domyślnej
 */
const cookieSetDefault: cookieSetDefaultTypedef = (
  cookieName: IcookieSetDefault['cookieName'],
  force: IcookieSetDefault['force'] = false,
): void => {
  const cookie: Icookie = (
    cookiesDefault.filter((c: Icookie): boolean => cookieName === c.name)[0]
  );
  const { name, options } = cookie;
  let value: Icookie['value'] = cookie.value;

  const _CookieSet: cookieSetLoopDefaultTypedef = (
    newValue: Icookie['value'],
    cookieOptions?: Icookie['options'],
  ): void => CookieSet(name, newValue, cookieOptions);

  const currentCookieValue: Icookie['value'] = cookieGetSafe(name) as Icookie['value'];
  const oldAndCurrentAreNotTheSame: boolean = currentCookieValue !== value;
  const currentValueIsUndefined: boolean = currentCookieValue === 'undefined';

  if (!force) {
    if (oldAndCurrentAreNotTheSame && !currentValueIsUndefined) {
      value = currentCookieValue;
    }
  }

  _CookieSet(value, options);
};

export { cookieSetDefault };
