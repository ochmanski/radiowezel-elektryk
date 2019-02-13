import {
  IDefaultAPIResponse,
  normalizeApiResponseFormat,
} from '@types';

import { defaultApiResponse } from '@helpers';

/**
 * Normalizuj dane z API (zapisz je do domyślnego formatu obiektu odpowiedzi)
 * @param data Tablica danych do zapisania
 * @param errorMessage Wiadomość błędu (obecność komunikatu wpływa na parametr "ok")
 * @see IDefaultAPIResponse
 */
const normalizeApiResponseFormat: normalizeApiResponseFormat = (
  data: IDefaultAPIResponse['data'],
  errorMessage: IDefaultAPIResponse['errorMessage'],
): IDefaultAPIResponse => {
  // Czy wystąpił błąd
  const ok: IDefaultAPIResponse['ok'] = typeof errorMessage === 'undefined';

  const response: IDefaultAPIResponse = {
    ...defaultApiResponse,
    errorMessage,
    ok,
    data,
    length: data.length,
  };

  console.log(response);

  return response;
};

export { normalizeApiResponseFormat };
