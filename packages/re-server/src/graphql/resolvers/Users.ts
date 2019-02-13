import {
  IAnyUserType,
  IUserNativeModel,
  IUserFacebookModel,
  AnyUserModel,
  UsersQuery,
  IAddUserNativeInput,
  IUsersInput,
  IUsers,
  IUpdateUserInput,
  IUserNativeSchema,
  IUserFacebookSchema,
} from '@types';

import {
  UserNative,
  UserFacebook,
} from '../../mongo';

import {
  genSalt,
  hash,
} from 'bcryptjs';

import { Request } from 'express';

const SALT_WORK_FACTOR: number = 10;

export default {

  AnyUserType: {
    // Zwróć prawidłowy typ użytkownika, kiedy używamy union AnyUserType
    // Można to zapisać na ifach, ale użytkownik w bazie zawsze ma
    // taki format loginType: "User[loginType]", na przykład UserFacebook
    __resolveType(obj: IAnyUserType): string {
      const { loginType } = obj;

      // Zamień "string" na "String"
      const preparedLoginType: string = (
        // tslint:disable-next-line:newline-per-chained-call
        loginType.charAt(0).toUpperCase() +
        loginType.slice(1)
      );

      return `User${preparedLoginType}`;
    },
  },

  Query: {
    /**
     * Zwróć użytkowników
     */
    async users(
      parent: object,
      args: IUsersInput,
      context: Request,
    ): UsersQuery {
      const input: IUsers = args.input || {};

      // Usuń limit, page i sort z obiektu query (inputa)
      // jesli tego nie zrobimy, to nie wyszukamy żadnego użytkownika
      // używając limit, page lub sort w zapytaniu
      const {
        limit: _1,
        page: _2,
        sort: _3,
        ...query
      } = input;

      // Zamień klucz id na _id ze względu na nazwę pola id
      // która jest zapisywana w mongoose
      if (query.id) {
        query._id = query.id;
        delete query.id;
      }

      const defaultLimit: number = 35;
      const defaultPage: number = 1;
      const defaultOffset: number = 0;
      const defaultSort: object = { createdAt: -1 };

      // Limit wyników
      const limit: number = input.limit || defaultLimit;

      // Paginacja
      const page: number = input.page || defaultPage;
      const offset: number = (limit * (Math.abs(page - 1))) || defaultOffset;

      // Sortowanie
      const sort: object = input.sort || defaultSort;

      // Użytkownicy zalogowani natywnie
      const usersNative: IUserNativeModel[] = await (
        UserNative
          .find(query)
          .skip(offset)
          .limit(limit)
          .sort(sort)
      );

      // Użytkownicy zalogowani przez Facebooka
      const usersFacebook: IUserFacebookModel[] = await (
        UserFacebook
          .find(query)
          .skip(offset)
          .limit(limit)
          .sort(sort)
      );

      return [
        ...usersNative,
        ...usersFacebook,
      ];
    },
  },
  Mutation: {
    /**
     * Dodaj użytkownika
     */
    addUser(_: object, args: IAddUserNativeInput): Promise<IAnyUserType> {
      const { loginType, ...restArgs } = args.input;
      const login: string = restArgs.login || '';
      const name: string = restArgs.name || '';

      // Domyślny nickname użytkownika to jego login
      if (login && !name) {
        restArgs.name = login;
      }

      let UserModel: AnyUserModel = UserNative;

      // Dodaj użytkownika w zależności od sposobu w jaki się loguje
      switch (loginType) {
        case 'native': break;

        case 'facebook':
          UserModel = UserFacebook;
          break;

        // Odrzuć próbę stworzenia użytkownika jeśli typ logowania
        // nie pasuje do żadnego znanego sposobu logowania
        default:
          return Promise.reject();
      }

      // Nie rozumiem jak to poprawić
      // @ts-ignore
      const newUser: IAnyUserType = new UserModel({ ...restArgs });
      // @ts-ignore
      newUser.setAvatar();

      return newUser.save();
    },

    /**
     * Zaktualizuj użytkownika
     */
    async updateUser(_: object, args: IUpdateUserInput): UsersQuery {
      const {
        find,
        update,
      } = args;

      if (find.id) {
        find._id = find.id;
        delete find.id;
      }

      if (update.password) {
        update.salt = await genSalt(SALT_WORK_FACTOR);
        update.password = await hash(update.password, update.salt);
      }

      const userNative: IUserNativeSchema | null = await UserNative.findOneAndUpdate(
        find,
        update, {
          new: true,
        });

      const userFacebook: IUserFacebookSchema | null = await UserFacebook.findOneAndUpdate(
        find,
        update, {
          new: true,
        });

      return userNative || userFacebook;
    },

    // Logowanie z graphql to chyba nie był dobry pomysł
    /*login(_: object, args: ILoginInput, context: object): DocumentQuery<
      IUserNativeSchema | null,
      IUserNativeSchema
    > {
      const { input } = args;

      const req: { body: ILogin } = {
        body: {
          login: input.login,
          password: input.password,
        },
      };

      authenticate('local', () => undefined)({ ...req, ...context });

      return UserNative.findOne({
        login: input.login,
      }) as DocumentQuery<
        IUserNativeSchema | null,
        IUserNativeSchema
      >;
    },*/

  },
};
