import { gql } from 'apollo-server-express'

const typeDef = gql`
  type User {
    id: String!
    name: String!
    email: String
    accounts: [Account]!
    sub: String!
    createdAt: String!
    updatedAt: String
  }

  input UserInput {
    email: String
    name: String
    sub: String!
  }

  extend type Mutation {
    me(user: UserInput): User!
    updateUser(user: UserInput): User!
  }
`

export { typeDef as User }
