export interface IcookiesSetDefault {
  /**
   * Czy nadpisać ciasteczko jeśli ma wartość inną od domyślnej
   */
  force?: boolean;
}

export type cookiesSetDefaultTypedef = ((
  force?: IcookiesSetDefault['force'],
  ) => void
);
