import {
  IUserNativeSchema,
  IUserFacebookSchema,
  IUserBaseSchema,
  IAnyUserType,
} from '@types';

export type UsersQuery = (
  Promise<
    DeepPartial<IAnyUserType | null>
  >
);

interface IUsersAdditionalInput {
  /**
   * Maksymalna ilość wyników
   * @default 35
   */
  limit?: number;
  
  /**
   * Która strona wyników ma być przekazana
   * @default 1
   */
  page?: number;
  
  /**
   * Sortuj wyniki, np. {id: -1}
   */
  sort?: object;
}

// Wyszukaj użytkowników na podstawie tych wartości
export interface IUsers extends IUsersAdditionalInput, Partial<IAnyUserType> {}

export interface IUsersInput {
  input: IUsers;
}

export interface IAddUserNativeInput {
  input: {
    facebookId?: IUserFacebookSchema['facebookId'];
    login?: IUserNativeSchema['login'];
    loginType: IUserBaseSchema['loginType'];
    name: IUserBaseSchema['name'];
    password?: IUserNativeSchema['password'];
  };
}

export interface ILoginInput {
  input: {
    login: IUserNativeSchema['login'];
    password: IUserNativeSchema['password'];
  };
}

export interface IUpdateUserInput {
  find: {
    _id?: IUserBaseSchema['_id'],
    id?: IUserBaseSchema['_id'],
    facebookId?: IUserFacebookSchema['facebookId'];
    login?: IUserNativeSchema['login'];
    loginType?: IUserBaseSchema['loginType'];
    name?: IUserBaseSchema['name'];
    points?: IUserBaseSchema['points'];
    settings?: Partial<IUserBaseSchema['settings']>;
    createdAt?: IUserBaseSchema['createdAt'];
    updatedAt?: IUserBaseSchema['updatedAt'];
  }
  update: {
    name?: IUserBaseSchema['name'];
    points?: IUserBaseSchema['points'];
    password?: IUserNativeSchema['password'];
    salt?: IUserNativeSchema['salt'];
    picture?: Partial<IUserBaseSchema['picture']>;
    settings?: Partial<IUserBaseSchema['settings']>;
  }
}
