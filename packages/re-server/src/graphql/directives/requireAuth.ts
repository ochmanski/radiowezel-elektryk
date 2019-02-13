import {
  SchemaDirectiveVisitor,
  AuthenticationError,
} from 'apollo-server-express';

import { GraphQLField } from 'graphql';

const messages: {
  notAuthorized: string;
  notSignedIn: string;
} = {
  notAuthorized: 'Nie masz uprawnień do przeglądania tego zasobu',
  notSignedIn: 'Trzeba być zalogowanym, aby przeglądać ten zasób',
};

export class RequireAuth extends SchemaDirectiveVisitor {
  // tslint:disable-next-line
  public visitFieldDefinition(field: GraphQLField<any, any>): void {
    const { resolve } = field;
    const { type } = this.args;

    // @ts-ignore
    // tslint:disable-next-line
    field.resolve = async function (...args): Promise<object> {
      const [, , ctx] = args;

      // Użytkownik jest zalogowany
      const userContextExists: boolean = ctx.req && ctx.req.user;

      if (userContextExists) {
        if (type && (!ctx.req.user.type || !ctx.req.user.type.includes(type))) {
          throw new AuthenticationError(messages.notAuthorized);
        } else {
          // @ts-ignore
          return resolve.apply(this, args);
        }
      } else {
        throw new AuthenticationError(messages.notSignedIn);
      }
    };
  }
}
