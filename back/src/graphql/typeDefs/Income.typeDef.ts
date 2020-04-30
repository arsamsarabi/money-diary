import { gql } from 'apollo-server-express'

const typeDef = gql`
  type Income {
    id: String!
    title: String!
    description: String
    amount: String!
    date: String!
    recurring: Boolean!
    frequency: String
    daysPerWeek: Int
    payer: String
    accountId: String!
    userId: String!
  }

  input IncomeInput {
    id: String
    title: String
    description: String
    amount: String
    date: String
    recurring: Boolean
    frequency: String
    daysPerWeek: Int
    payer: String
    accountId: String!
    userId: String!
  }

  extend type Query {
    getIncomesForUser(userId: String!): [Income]!
    getIncomesForAccount(accountId: String!): [Income]!
  }

  extend type Mutation {
    addIncome(income: IncomeInput): Income
    updateIncome(income: IncomeInput): Income
    deleteIncome(incomeId: String, userId: String): Income
  }
`

export { typeDef as Income }
