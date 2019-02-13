import path from 'path';
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';

const typedefsPath: string = path.join(__dirname, '.');
const resolversArray: string[] = fileLoader(typedefsPath);

// Wyłączam tutaj no-any, ze względu na to, że merge-graphql-schemas
// ma źle napisane typowanie
// Usuń dwa komentarze poniżej, zmień typ resolvers na string i
// i przejdź do ApolloServer.ts aby zobaczyć w czym jest problem
/* tslint:disable:no-any */
// @ts-ignore
export const resolvers: any = mergeResolvers(resolversArray);
