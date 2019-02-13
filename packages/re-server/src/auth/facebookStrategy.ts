/**
 * To nie jest potrzebne, bo dostajemy dane od razu z API Facebooka
 * Uwierzetylnianie klienta odbywa sie po stronie frontu
 * a zatem nie ma potrzeby żeby było to samo po stronie serwera
 *
 * Odkomentuj to co jest na dole jeśli ktokolwiek w tym projekcie
 * zmienił zdanie na temat uwierzetylniania klienta logującego się Facebookiem
 */

/*
import {
  passportDoneFunction,
  IAnyUserType,
  IUserFacebookFindOne,
} from '@types';

import {
  Strategy as FacebookStrategy,
} from 'passport-facebook';

import { UserNative } from '../mongo';

interface IfacebookProfile {
  id: string;
  name: string;
  picture: object;
}

interface ImakeFacebookStrategyArgs {
  accessToken: string;
  done: passportDoneFunction;
  profile: IfacebookProfile;
  refreshToken: string;
}

type makeFacebookStrategy = (
  accessToken: ImakeFacebookStrategyArgs['accessToken'],
  refreshToken: ImakeFacebookStrategyArgs['refreshToken'],
  profile: ImakeFacebookStrategyArgs['profile'],
  done: ImakeFacebookStrategyArgs['done'],
) => IUserFacebookFindOne;

const makeFacebookStrategy: makeFacebookStrategy = (
  accessToken: ImakeFacebookStrategyArgs['accessToken'],
  refreshToken: ImakeFacebookStrategyArgs['refreshToken'],
  profile: ImakeFacebookStrategyArgs['profile'],
  done: ImakeFacebookStrategyArgs['done'],
): IUserFacebookFindOne => {
  const query: object = { facebookId: profile.id };

  console.log(profile);

  return UserNative.findOne(query, (err: Error, user: IAnyUserType) => {
    if (err) return done(err);
    // Podanego użytkownika nie ma
    if (!user) return done(undefined, false);

  });
};

const facebookStrategy: () => FacebookStrategy = (): FacebookStrategy => new FacebookStrategy({
  clientID: process.env.FB_APP_ID || '',
  clientSecret: process.env.FB_APP_SECRET || '',
  callbackURL: '/auth/login/facebook/callback',
  profileFields: ['id', 'name', 'picture'],
}, makeFacebookStrategy);

export { facebookStrategy, makeFacebookStrategy };
*/
