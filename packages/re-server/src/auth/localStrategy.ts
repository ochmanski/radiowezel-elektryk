import {
  passportDoneFunction,
  IAnyUserType,
  IUserNativeFindOne,
} from '@types';

import {
  Strategy as LocalStrategy,
} from 'passport-local';

import { UserNative } from '../mongo';
import { compare } from 'bcryptjs';
import { Request } from 'express';

interface ImakeLocalStrategyArgs {
  done: passportDoneFunction;
  login: string;
  password: string;
  req: Request;
}

type makeLocalStrategyType = (
  login: ImakeLocalStrategyArgs['login'],
  password: ImakeLocalStrategyArgs['password'],
  done: ImakeLocalStrategyArgs['done'],
) => IUserNativeFindOne;

const makeLocalStrategy: makeLocalStrategyType = (
  login: ImakeLocalStrategyArgs['login'],
  password: ImakeLocalStrategyArgs['password'],
  done: ImakeLocalStrategyArgs['done'],
): IUserNativeFindOne => {
  const query: object = { login };

  return UserNative.findOne(query, (err: Error, user: IAnyUserType) => {
    if (err) return done(err);
    // Podanego użytkownika nie ma
    if (!user) return done(undefined, false);

    return compare(password, user.password, (compareError: Error, isMatch: boolean) => {
      // Podane hasło jest nieprawidłowe
      if (compareError) return done(compareError);

      // @ts-ignore - Prawidłowe dane
      if (isMatch) return done(undefined, user.getPublicFields());
    });
  })
    .select('+password +salt');
};

const localStrategy: () => LocalStrategy = (): LocalStrategy => new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password',
}, makeLocalStrategy);

export { localStrategy, makeLocalStrategy };
