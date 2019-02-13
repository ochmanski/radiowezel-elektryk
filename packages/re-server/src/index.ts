import dotEnv from 'dotenv-safe';

dotEnv.config({
  path: '../../config/.env',
  sample: '../../config/.env.example',
  allowEmptyValues: false,
});

// tslint:disable:no-default-import
import app from './app';
import { Port } from '@types';
import { Server, createServer } from 'http';
import { ApolloServer } from './graphql';

const port: Port = 3000;
const server: Server = createServer(app);

ApolloServer.applyMiddleware({ app });

server.listen(port, () => {
  console.log(`👂 Serwer nasłuchuje na porcie ${port}`);
});
