import { CookieAttributes } from 'js-cookie';
import { IAnyUserType } from '@re/server/types';

// C.p. = Ciasteczko przechowujące

 /**
  * Generyczne ciasteczko
  */
export interface Icookie {
  /**
   * Nazwa ciasteczka
   */
  name: IcookiesName;

  /**
   * Opcje ciasteczka
   * @see CookieAttributes
   */
  options?: CookieAttributes;

  /**
   * Wartość ciasteczka
   */
  value: string | object;
}

/**
 * C.p. dane użytkownika
 */
export interface IcookieUser extends Icookie {
  name: 'user';
}

/**
 * C.p. nazwę motywu
 */
export interface IcookieThemeName extends Icookie {
  name: 'themeName';
  value: 'light' | 'dark';
}

/**
 * C.p. czy licznik jest schowany
 */
export interface IcookieCounterHidden extends Icookie {
  name: 'counterHidden';
  value: 'false' | 'true';
}

/**
 * C.p. czy nazwy podstron są schowane
 */
export interface IcookieSubpageLabelHidden extends Icookie {
  name: 'subpageLabelHidden';
  value: 'false' | 'true';
}

/**
 * Wszystkie dostępne ciasteczka
 */
export type Icookies = [
  IcookieUser,
  IcookieThemeName,
  IcookieCounterHidden,
  IcookieSubpageLabelHidden
];

// @TODO
// Zamienić to na jakieś funkcje z typescript

/**
 * Dowolna nazwa ciasteczka
 */
export type IcookiesName = (
  IcookieUser['name'] |
  IcookieThemeName['name'] |
  IcookieCounterHidden['name'] |
  IcookieSubpageLabelHidden['name']
);

/**
 * Dowolna wartość ciasteczka
 */
export type IcookiesValue = (
  IcookieUser['value'] |
  IcookieThemeName['value'] |
  IcookieCounterHidden['value'] |
  IcookieSubpageLabelHidden['value']
);
