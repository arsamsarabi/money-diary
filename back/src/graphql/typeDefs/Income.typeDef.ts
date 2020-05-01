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
    account: Account!
    user: User!
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
    account: String!
    user: String!
  }

  extend type Query {
    getMyIncomes(user: String!): [Income]!
  }

  extend type Mutation {
    addIncome(newIncome: IncomeInput): Income
    updateIncome(incomeToUpdate: IncomeInput): Income
    deleteIncome(id: String, userId: String): Income
  }
`

export { typeDef as Income }
