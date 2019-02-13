import {
  ApolloServer as _ApolloServer,
} from 'apollo-server-express';

import {
  RequireAuth as requireAuth,
} from './directives';

import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';
import { Request } from 'express';
// import { IDefaultAPIResponse } from '@types';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    requireAuth,
  },
});

export const ApolloServer: _ApolloServer = new _ApolloServer({
  schema,
  playground: true,
  context: ({ req }: {req: Request}): Request => req,
});
