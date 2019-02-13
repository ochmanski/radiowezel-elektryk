import {
  IUserNativeSchema,
} from '@re/server/types';

import {
  Icookie,
  IcookiesValue,
} from '@types';

export interface IcookieGetSafe {
  /**
   * Nazwa ciasteczka
   */
  name: Icookie['name'];
}

export type cookieGetSafeReturnType = (
  IUserNativeSchema |
  IcookiesValue |
  object |
  string |
  boolean
);

export type cookieGetSafeTypedef = (
  name: IcookieGetSafe['name'],
) => cookieGetSafeReturnType;
