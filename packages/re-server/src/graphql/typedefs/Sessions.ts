export default `

directive @requireAuth on FIELD_DEFINITION

schema {
  query: Query
}

type Sessions {
  id: ID
  expires: String
  session: String
}

input findSessionsByUserId {
  userId: ID
}

type Query {
  """ Zwróć sesje """
  sessions(input: findSessionsByUserId): [Sessions]
}

`;
