import { Omit, InjectedNotistackProps } from 'notistack';

export type withSnackbarReturnType<P extends InjectedNotistackProps> = (
  React.ComponentClass<Omit<P, keyof InjectedNotistackProps>> & {
    WrappedComponent: React.ComponentType < P > ;
  }
);
