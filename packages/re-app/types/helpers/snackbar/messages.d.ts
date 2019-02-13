import { OptionsObject } from 'notistack';
import { IAnyUserType } from '@re/server/types';

export interface IsnackbarMessage {
  /**
   * Podtytuł wiadomości
   */
  subtitle: string;

  /**
   * Tytuł wiadomości
   */
  title: string;
}

export type snackbarMessageData = (
  IAnyUserType &
  object
);
