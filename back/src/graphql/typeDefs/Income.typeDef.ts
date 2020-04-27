import { gql } from 'apollo-server-express'

const typeDef = gql`
  type Income {
    id: String!
    title: String!
    description: String
    amount: Float!
    date: String!
    recurring: Boolean!
    frequency: String
    daysPerWeek: Int
    accountId: String!
    userId: String!
  }

  input IncomeInput {
    id: String
    title: String
    description: String
    amount: Float
    date: String
    recurring: Boolean
    frequency: String
    daysPerWeek: Int
    accountId: String!
    userId: String!
  }
`

export { typeDef as Income }
