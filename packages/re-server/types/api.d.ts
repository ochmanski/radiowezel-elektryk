// tslint:disable:no-any
// Domyślny obiekt odpowiedzi z API
export interface IDefaultAPIResponse {
  /**
   * Odpowiedź z serwera
   */
  data: any[];

  /**
   * Potencjalna treść błędu
   */
  errorMessage: string | string[] | ReadonlyArray<string[]>;

  /**
   * Ile jest danych w data
   */
  length: number;

  /**
   * Wszystko ok
   */
  ok: boolean;
}
