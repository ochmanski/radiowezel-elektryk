import {
  IAuthState,
  onSubmitFnLogin,
} from '@types';

import { InjectedFormikProps } from 'formik';
import { ChangeEvent } from 'react';

export interface IPropsBase {
  test?: undefined;
}

export interface IPropsValues {
  login: string;
  password: string;
}

export interface IProps extends InjectedFormikProps<IPropsBase, IPropsValues> {}

export interface IonChangeFn {
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  name: keyof IPropsValues;
}

export type onChangeFn = (
  name: IonChangeFn['name'],
  e: IonChangeFn['e'],
) => void;
