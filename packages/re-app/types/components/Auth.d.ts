import {
  IAppState,
  changeAppState,
} from '@types';

import {
  RouteComponentProps,
  Route,
} from 'react-router';

import { FormEvent } from 'react';
import { InjectedNotistackProps } from 'notistack';

export type onSubmitFnLogin = (
  e: FormEvent<HTMLFormElement>,
) => void;

export type onSubmitFnRegister = (
  e: FormEvent<HTMLFormElement>,
) => void;

export type setSubmittingFn = (
  isSubmitting: boolean,
) => void;

export interface IProps extends RouteComponentProps, InjectedNotistackProps {
  changeAppState: changeAppState;
  userLoggedIn: IAppState['userLoggedIn'];
}

export interface IState {

  test?: undefined;
}
