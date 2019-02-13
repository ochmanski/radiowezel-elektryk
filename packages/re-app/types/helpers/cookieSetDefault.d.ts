import {
  Icookie,
  IcookiesName,
} from '@types';

export interface IcookieSetDefault {
  /**
   * Nazwa ciasteczka
   */
  cookieName: Icookie['name'];
  /**
   * Czy nadpisać ciasteczko jeśli ma wartość inną od domyślnej
   */
  force?: boolean;
}

export type cookieSetDefaultTypedef = (
  cookieName: IcookieSetDefault['cookieName'],
  force?: IcookieSetDefault['force'],
) => void;

export type cookieSetLoopDefaultTypedef = (
  newValue: Icookie['value'],
  cookieOptions?: Icookie['options'],
) => void;
