import { ReactNode } from 'react';
import { OptionsObject } from 'notistack';

import {
  IsnackbarMessage,
  snackbarMessageData,
} from '@types';

export type snackbarTemplateParamsData = (
  object &
  snackbarMessageData &
  IsnackbarMessage
);

export interface IsnackbarTemplateParams {
  /**
   * Obiekt z propsami zawierającymi wiadomości do wyświetlenia
   */
  data: snackbarTemplateParamsData;

  /**
   * Dodatkowe opcje
   */
  options?: OptionsObject;
}

// export type snackbarOptions = object & {
//   default: object;
// };

export interface IsnackbarTemplateReturnType {
  content: ReactNode;
  options: OptionsObject | object;
}
