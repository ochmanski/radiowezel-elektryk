import express, {
  Application,
  json,
  Request,
  Response,
} from 'express';

import {
  IUserNativeSchema,
  IUserFacebookSchema,
  IAnyUserType,
  passportDoneFunction,
} from '@types';

// @ts-ignore
// tslint:disable-next-line
import mongooseConnect, {
  UserNative,
  UserFacebook,
} from './mongo';

import {
  connection,
  DocumentQuery,
  Error,
} from 'mongoose';

import {
  localStrategy,
} from './auth';

import useragent from 'express-useragent';
import passport from 'passport';
import session from 'express-session';
import _MongoStore from 'connect-mongo';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Application = express();
const MongoStore: _MongoStore.MongoStoreFactory = _MongoStore(session);
const SESSION_SECRET: string = process.env.SESSION_SECRET || '\
  usuń ten string żeby zobaczyć jaki jest błąd\
  przecież używam dotenv safe i string nigdy nie będzie undefined ehh\
';
const SESSION_MAX_AGE: string = process.env.SESSION_MAX_AGE || '7776000000'; // 90 dni
const corsWhitelist: string[] = [
  `http://localhost:${process.env.APP_FORWARD_HOST_PORT}`,
  `http://localhost:${process.env.SERVER_FORWARD_HOST_PORT}`,
];

app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: (
    origin: string,
    callback: (err: Error | null, allow?: boolean) => void,
  ): void => {
    if (corsWhitelist.indexOf(origin) !== -1 || !origin) {
      // tslint:disable:no-null-keyword
      callback(null, true);
    } else {
      callback(new Error('Brak autoryzacji CORS'));
    }
  },
}));
app.use(json());
app.use(useragent.express());

app.use(session({
  name: 're-sid',
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: +SESSION_MAX_AGE,
    httpOnly: false,
    secure: false,
  },
  store: new MongoStore({
    mongooseConnection: connection,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

// Wpisz użytkownika do sesji
passport.serializeUser((user: IAnyUserType, done: passportDoneFunction) => {
  done(undefined, user.id);
});

// Wypisz użytkownika z sesji
passport.deserializeUser(async (id: string, done: passportDoneFunction) => {
  const usersNative: (
    DocumentQuery<IUserNativeSchema | null, IUserNativeSchema>
  ) = UserNative.findById(id);

  const usersFacebook: (
    DocumentQuery<IUserFacebookSchema | null, IUserFacebookSchema>
  ) = UserFacebook.findById(id);

  const result: (
    PromiseLike<object> | object
  ) = await usersNative || await usersFacebook || {};

  done(undefined, result);
});

passport.use('local', localStrategy());

// Zaloguj użytkownika natywnego
app.post('/auth/login/native', passport.authenticate('local'), (req: Request, res: Response) => {
  if (req.session) {
    req.session.useragent = req.useragent;
  }
  res.send(req.user);
});

// Wyloguj użytkownika natywnego
app.post('/auth/logout/native', (req: Request, res: Response) => {
  req.logout();
  if (req.session) {
    req.session.destroy((err: Error) => {
      res.send(err);
    });
  }
});

app.get('/', (req: Request, res: Response) => {
  res.set('Content-Type', 'text/html');
  res.send(Buffer.from(`
    <a href='#'>Radiowęzeł Elektryk serwer</a>
  `));
});

export default app;
