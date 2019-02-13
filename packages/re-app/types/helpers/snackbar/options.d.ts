import { SnackbarProviderProps } from 'notistack';

export type snackbarOptions = object & SnackbarProviderProps & {
  default: SnackbarProviderProps;
};
