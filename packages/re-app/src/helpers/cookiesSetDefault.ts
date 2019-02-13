import {
  IcookiesSetDefault,
  cookiesSetDefaultTypedef,
  Icookie,
} from '@types';

import {
  cookiesDefault,
  cookieSetDefault,
} from '@helpers';

/**
 * Nadaj domyślne wartości wszystkim ciasteczkom
 * @param force Czy nadpisać ciasteczko jeśli ma wartość inną od domyślnej
 */
const cookiesSetDefault: cookiesSetDefaultTypedef = (
  force: IcookiesSetDefault['force'] = false,
): void => {
  cookiesDefault.forEach((cookie: Icookie, key: number) => {
    const { name } = cookie;
    cookieSetDefault(name, force);
  });
};

export { cookiesSetDefault };
