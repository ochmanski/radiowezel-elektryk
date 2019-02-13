import {
  connection as mongooseConnection,
} from 'mongoose';

export default {

  Query: {
    /**
     * Zwróć sesje
     */
    async sessions(
      parent: object,
      args: {input: { userId: string }},
    ): Promise<object> {
      // @ts-ignore
      const sessions: object[] = await mongooseConnection.db
        .collection('sessions')
        .find({ session: new RegExp(`${args.input.userId}`, 'i') })
        .toArray();

      return sessions;
    },
  },
};
