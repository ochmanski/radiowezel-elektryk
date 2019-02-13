import { IcookieThemeName } from '@types';

export interface IProps {
  test?: undefined;
}

export interface IState {

  /**
   * Pokaż / ukryj licznik
   */
  counterHidden: boolean;

  /**
   * Pokaż / ukryj nazwy podstron
   */
  subpageLabelHidden: boolean;

  /**
   * Nazwa motywu
   */
  themeName: IcookieThemeName['value'];
  /**
   * Czy użytkownik jest zalogowany
   */
  userLoggedIn: boolean;

}

/**
 * Zmień stan w App
 * @param newState nowy stan do zmergowania
 */
export type changeAppState = (newState: Partial<IState>) => void;
