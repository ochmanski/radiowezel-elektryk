import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const typeDefsPath: string = path.join(__dirname, '.');
const typesArray: string[] = fileLoader(typeDefsPath);

export const typeDefs: string = mergeTypes(typesArray, { all: true });
