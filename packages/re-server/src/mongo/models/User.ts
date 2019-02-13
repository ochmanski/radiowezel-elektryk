import {
  Schema,
  model,
  SchemaOptions,
  Model,
} from 'mongoose';

import {
  IUserBaseSchema,
  IUserNativeSchema,
  IUserFacebookSchema,
  IAnyUserType,
} from '@types';

import {
  genSalt,
  hash,
} from 'bcryptjs';

import jdenticon from 'jdenticon';
import { NextFunction } from 'express';
import { randomBytes } from 'crypto';

/**
 * Typy kont użytkowników
 */
const typesOfUsers: string[] = [
  /**
   * Głosowanie, dodawanie sobie punktów poprzez kody / linki
   */
  'Normal',

  /**
   * Wszystko to co 'Normal', dodatkowo:
   *
   * Tworzenie głosowań oraz usuwanie ich (tylko swoich głosowań),
   * Tworzenie kodów dodających punkty
   */
  'Admin',

  /**
   * Wszystko to co 'Admin', dodatkowo:
   *
   * Usuwanie dowolnych głosowań,
   * Usuwanie użytkowników,
   * Nadawanie uprawnień użytkownikom,
   * Stream dźwięku bezpośrednio do radiowęzła
   */
  'SuperAdmin',
];

/**
 * Rozdziel model użytkownika na modele, które używane są
 * w zależności od sposobu logowania
 * np. model użytkownika różni się, gdy loguje się natywnie
 * poprzez facebooka, czy google
 */
const discriminatorKey: string = 'loginType';

const SALT_WORK_FACTOR: number = 10;

const options: SchemaOptions = {
  discriminatorKey,
  timestamps: true,
};

/**
 * Podstawowa wersja użytkownika (dziedziczy po niej każdy typ użytkownika)
 */
const UserBaseSchema: Schema = new Schema({
  /**
   * Nazwa użytkownika (nickname)
   */
  name: {
    type: String,
    trim: true,
    unique: true,
    minlength: 3,
  },

  /**
   * Typ konta użytkownika
   */
  type: {
    type: String,
    enum: typesOfUsers,
    default: 'Normal',
  },

  /**
   * Zdjęcie profilowe
   */
  picture: {
    small: {
      type: Buffer,
      contentType: String,
    },
    normal: {
      type: Buffer,
      contentType: String,
    },
  },

  /**
   * Ilość punktów użytkownika
   */
  points: {
    type: Number,
    default: 10,
  },

  /**
   * Ustawienia
   */
  settings: {

    /**
     * Nazwa motywu
     */
    themeName: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },

    /**
     * Czy licznik jest schowany
     */
    counterHidden: {
      type: Boolean,
      default: false,
    },

    /**
     * Czy nazwy podstron są schowane
     */
    subpageLabelHidden: {
      type: Boolean,
      default: false,
    },
  },
}, options);

// UserBaseSchema.methods.setAdorableAvatar = async function (): Promise<void> {
//   // tslint:disable:newline-per-chained-call
//   const avatars: string[] = getAdorableAvatars(this._id);
//   this.picture.small = await fetch(avatars[0], {
//     method: 'GET',
//   })
//     .then((r: Response) => r.arrayBuffer())
//     .catch((err: Error) => console.log(err));

//   this.picture.normal = await fetch(avatars[1], {
//     method: 'GET',
//   })
//     .then((r: Response) => r.arrayBuffer())
//     .catch((err: Error) => console.log(err));

//   // this.save();
// };

UserBaseSchema.methods.setAvatar = function (): void {
  // tslint:disable:no-magic-numbers
  const avatarSizes: number[] = [50, 150];
  const avatarPaddings: number[] = [0.18, 0.195];
  // const avatarValue: string = this.login || this.name;
  const avatarValue: string = (
    randomBytes(10)
      .toString('hex')
  );
  // @ts-ignore
  jdenticon.config.saturation = {
    color: 0.65,
  };
  // @ts-ignore
  this.picture.small = jdenticon.toPng(avatarValue, avatarSizes[0], avatarPaddings[0]);
  // @ts-ignore
  this.picture.normal = jdenticon.toPng(avatarValue, avatarSizes[1], avatarPaddings[1]);
};

/**
 * Zwróć dane użytkownika
 */
UserBaseSchema.methods.getPublicFields = function (): Partial<IAnyUserType> {
  return {
    id: this._id,
    login: this.login,
    type: this.type,
    name: this.name,
    loginType: this.loginType,
    points: this.points,
    picture: this.picture,
    settings: this.settings,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

/**
 * Zahashuj hasło
 */
UserBaseSchema.methods.savePassword = async function (): Promise<void> {
  this.salt = await genSalt(SALT_WORK_FACTOR);
  this.password = await hash(this.password, this.salt);
};

const UserBase: Model<IUserBaseSchema> = model('User', UserBaseSchema);

/**
 * Użytkownik, który loguje się przy użyciu Radiowęzeł Elektryk
 */
const UserNativeSchema: Schema = new Schema({
  /**
   * Nazwa użytkownika (login)
   */
  login: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 3,
  },

  /**
   * Hasło
   */
  password: {
    type: String,
    required: true,
    // select: false,
  },

  /**
   * Sól do hasła
   */
  salt: {
    type: String,
    required: false,
    // select: false,
  },
}, options);

/**
 * Napraw to kiedyśtam
 * tj. dodaj typ do this
 * oraz wyodrębnij callback żeby móc użyć go ponownie
 * Update hasła nie będzie działać jeśli się tego nie zmieni
 * (będzie działać ale zapisze "gołe" hasło)
 */
UserNativeSchema.pre('save', async function (next: NextFunction): Promise<void> {
  // @ts-ignore
  await this.savePassword();
  // // @ts-ignore
  // this.salt = await genSalt(SALT_WORK_FACTOR);
  // // @ts-ignore
  // this.password = await hash(this.password, this.salt);

  return next();
});

// UserNativeSchema.methods.hashPassword()

/**
 * Użytkownik, który loguje się przy użyciu Facebooka
 */
const UserFacebookSchema: Schema = new Schema({
  /**
   * Id z Facebooka
   */
  facebookId: {
    type: String,
    unique: true,
    required: true,
  },
}, options);

const UserFacebook: Model<IUserFacebookSchema> = (
  UserBase.discriminator('facebook', UserFacebookSchema)
);

const UserNative: Model<IUserNativeSchema> = (
  UserBase.discriminator('native', UserNativeSchema)
);

export {
  UserBase,
  UserFacebook,
  UserNative,
};
