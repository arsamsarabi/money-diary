import { gql } from 'apollo-server-express'

const typeDef = gql`
  type Expense {
    id: String!
    title: String!
    description: String
    amount: Float!
    date: String!
    recurring: Boolean!
    frequency: String
    endDate: String
    categories: [String!]!
    payee: String
    accountId: String!
    userId: String!
  }

  input ExpenseInput {
    id: String
    title: String
    description: String
    amount: Float
    date: String
    recurring: Boolean
    frequency: String
    endDate: String
    categories: [String]
    payee: String
    accountId: String!
    userId: String!
  }

  extend type Query {
    getExpensesByUserId(userId: String): [Expense]!
  }

  extend type Mutation {
    addExpense(ExpenseInput: ExpenseInput): Expense!
  }
`

export { typeDef as Expense }
