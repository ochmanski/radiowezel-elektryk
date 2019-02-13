import React from 'react';
import ReactDOM from 'react-dom';

import {
  cookiesSetDefault,
  serverAddress,
  snackbarOptions,
} from '@helpers';

import {
  SnackbarProvider,
  SnackbarProviderProps,
} from 'notistack';

import { App } from '@components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import '@styles/components/index.scss';

const client: ApolloClient<{}> = (
  new ApolloClient({ uri: `${serverAddress}/graphql` })
);

const snackbarProviderProps: SnackbarProviderProps = snackbarOptions.default;

cookiesSetDefault();

ReactDOM.render(
  (
    <ApolloProvider client={ client }>
      <SnackbarProvider {...snackbarProviderProps} >
        <App />
      </SnackbarProvider>
    </ApolloProvider>
  ),
  document.getElementById('root'),
);
