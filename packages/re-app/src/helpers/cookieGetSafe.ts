import {
  cookieGetSafeTypedef,
  cookieGetSafeReturnType,
  IcookieGetSafe,
} from '@types';

import { get as CookieGet } from 'js-cookie';

/**
 * Zwróć wartość ciasteczka jako string lub obiekt (w zależności
 * czy wartość z ciasteczka można przekonwertować na obiekt)
 * @param name Nazwa ciasteczka
 * @returns cookieGetSafeReturnType
 */
const cookieGetSafe: cookieGetSafeTypedef = (
  name: IcookieGetSafe['name'],
): cookieGetSafeReturnType => {

  // Możemy dać "as string" ponieważ na początku zawsze
  // ustawiamy wartości domyślne używanych ciasteczek
  const cookieValue: string = CookieGet(name) as string;
  let cookieObj: object = {};

  try {
    cookieObj = JSON.parse(cookieValue);
  } catch (error) {
    return cookieValue;
  }

  return cookieObj;
};

export { cookieGetSafe };
