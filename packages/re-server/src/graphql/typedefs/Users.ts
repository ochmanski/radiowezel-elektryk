export default `

directive @requireAuth on FIELD_DEFINITION

schema {
  query: Query
  mutation: Mutation
}

type UserPicture {
  """ 50x50 (px) """
  small: String

  """ 150x150 (px) """
  normal: String
}

type UserSettings {
  """ Nazwa motywu """
  themeName: String

  """ Czy licznik jest schowany """
  counterHidden: Boolean

  """ Czy nazwy podstron są schowane """
  subpageLabelHidden: Boolean
}

""" Użytkownik abstrakcyjny (bazowy) *** NIE UŻYWAJ W QUERY """
interface UserBase {
  id: ID!
  loginType: String!
  type: String!
  name: String
  points: Int
  picture: UserPicture
  settings: UserSettings
  createdAt: String!
  updatedAt: String!
}

""" Użytkownik, który loguje się natywnie przez Radiowęzeł Elektryk """
type UserNative implements UserBase {
  """ Id użytkownika """
  id: ID!

  """ W jaki sposób użytkownik loguje się """
  loginType: String!

  """ Typ konta użytkownika """
  type: String!

  """ Nazwa użytkownika (displayName) """
  name: String

  """ Ilość punktów głosowania użytkownika """
  points: Int

  """ Zdjęcie profilowe użytkownika """
  picture: UserPicture

  """ Ustawienia """
  settings: UserSettings

  """ Kiedy konto zostało utworzone """
  createdAt: String!

  """ Kiedy konto zostało zaktualizowane """
  updatedAt: String!

  """ Login użytkownika """
  login: String!

  """ Hasło użytkownika """
  password: String!

  """ Sól hasła """
  salt: String
}

""" Użytkownik, który loguje się przez Facebooka """
type UserFacebook implements UserBase {
  """ Id użytkownika """
  id: ID!

  """ W jaki sposób użytkownik loguje się """
  loginType: String!

  """ Typ konta użytkownika """
  type: String!

  """ Nazwa użytkownika (displayName) """
  name: String

  """ Ilość punktów głosowania użytkownika """
  points: Int

  """ Zdjęcie profilowe użytkownika """
  picture: UserPicture

  """ Ustawienia """
  settings: UserSettings

  """ Kiedy konto zostało utworzone """
  createdAt: String!

  """ Kiedy konto zostało zaktualizowane """
  updatedAt: String!

  """ Id z API Facebooka """
  facebookId: ID!
}

""" Dowolny typ użytkownika, zobacz AnyUserType.__resolveType w ../resolvers/Users.ts """
union AnyUserType = UserNative | UserFacebook

input AddUserInput {
  loginType: String!
  login: String
  name: String
  password: String
  type: String
  facebookId: ID
}

input UsersInputSettings {
  themeName: String
  counterHidden: Boolean
  subpageLabelHidden: Boolean
}

input UsersInputPicture {
  small: String
  normal: String
}

input UsersInputSort {
  id: ID
  facebookId: ID
  name: String
  loginType: String
  points: Int
  settings: UsersInputSettings
  createdAt: String
  updatedAt: String
}

input UsersInput {
  id: [ID]
  facebookId: [ID]
  name: [String]
  loginType: [String]
  points: [Int]
  settings: [UsersInputSettings]
  createdAt: [String]
  updatedAt: [String]
  limit: Int
  page: Int
  sort: UsersInputSort
}

input FindUserInput {
  id: ID
  facebookId: ID
  login: String
  loginType: String
  name: String
  points: Int
  settings: UsersInputSettings
  createdAt: String
  updatedAt: String
}

input UpdateUserInput {
  name: String
  points: Int
  password: String
  picture: UsersInputPicture
  settings: UsersInputSettings
}

type Query {
  """ Zwróć użytkowników """
  users(input: UsersInput): [AnyUserType]
}

type Mutation {

  """ Dodaj użytkownika """
  addUser(input: AddUserInput): AnyUserType

  """ Aktualizuj użytkownika """
  updateUser(find: FindUserInput, update: UpdateUserInput): AnyUserType

}

`;
