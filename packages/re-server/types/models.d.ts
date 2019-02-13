import { Document, DocumentQuery, Model } from 'mongoose';

// tslint:disable:no-any

export interface IUserBaseSchema extends Document {
  /**
   * Id użytkownika (jeśli szukamy)
   */
  _id: any;

  /**
   * Kiedy konto zostało utworzone
   */
  createdAt: string;

  /**
   * Id użytkownika (dostajemy w odpowiedzi)
   */
  id: any;

  /**
   * W jaki sposób użytkownik loguje się
   */
  loginType: 'native' | 'facebook';

  /**
   * Nazwa użytkownika (displayName)
   */
  name: string;

  /**
   * Zdjęcie profilowe użytkownika
   */
  picture: {
    /**
     * 50x50 (px)
     */
    normal: Buffer | string;

    /**
     * 150x150 (px)
     */
    small: Buffer | string;
  };

  /**
   * Ilość punktów głosowania użytkownika
   */
  points: number;

  /**
   * Ustawienia
   */
  settings: {

    /**
     * Czy licznik jest schowany
     */
    counterHidden: boolean;

    /**
     * Czy nazwy podstron są schowane
     */
    subpageLabelHidden: boolean;

    /**
     * Nazwa motywu
     */
    themeName: 'light' | 'dark';
  };

  /**
   * Typ konta użytkownika
   */
  type: 'Normal' | 'Admin' | 'SuperAdmin';

  /**
   * Kiedy konto zostało zaktualizowane
   */
  updatedAt: string;
}

export interface IUserNativeSchema extends IUserBaseSchema {
  /**
   * Login użytkownika
   */
  login: string;

  /**
   * Hasło użytkownika
   */
  password: string;

  /**
   * Sól hasła
   */
  salt: string;
}

export interface IUserFacebookSchema extends IUserBaseSchema {
  /**
   * Id z API Facebooka
   */
  facebookId: string;
}

export interface IUserNativeFindOne extends
  DocumentQuery<IUserNativeSchema | null, IUserNativeSchema> {}

export interface IUserFacebookFindOne extends
  DocumentQuery<IUserFacebookSchema | null, IUserFacebookSchema> {}

export interface IAnyUserType extends IUserNativeSchema, IUserFacebookSchema {}

export interface IUserNativeModel extends IUserNativeSchema, Document {}

export interface IUserFacebookModel extends IUserFacebookSchema, Document {}

export type AnyUserModel = (
  Model<IUserNativeSchema, {}> |
  Model<IUserFacebookSchema, {}>
);
