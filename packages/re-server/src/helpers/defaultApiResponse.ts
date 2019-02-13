import { IDefaultAPIResponse } from '@types';

/**
 * Normalizacja nie jest używana w odpowiedziach
 * serwera ze względu na możliwość nieprawidłowego działania
 * cache z Apollo
 */

/**
 * Domyślna odpowiedź z serwera
 * @see IDefaultAPIResponse
 */
const defaultApiResponse: IDefaultAPIResponse = {
  errorMessage: '',
  ok: false,
  data: [],
  length: 0,
};

export { defaultApiResponse };
