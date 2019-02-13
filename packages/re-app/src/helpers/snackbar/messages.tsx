import {
  IsnackbarMessage as message,
  snackbarMessageData as messageData,
} from '@types';

/**
 * Wszystkie wiadomości
 *
 * Format nazewnictwa wiadomości:
 *
 * NAZWA__STATUS, np. LOGIN__SUCCESS, FETCH__FAILURE
 *
 * lub DLUZSZA_NAZWA__STATUS, np. FIRST_LOGIN__FAILURE
 */
const snackbarMessages: object = {

  LOGIN__SUCCESS: (data: messageData): message => ({
    title: `Witaj ${data.name}, dobrze Cię widzieć`,
    subtitle: 'Zalogowano pomyślnie',
  }),

  LOGOUT__SUCCESS: (data: messageData): message => ({
    title: `Do zobaczenia ${data.name}`,
    subtitle: 'Wylogowano pomyślnie',
  }),

};

export { snackbarMessages };
