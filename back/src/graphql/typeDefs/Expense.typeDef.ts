import { gql } from 'apollo-server-express'

const typeDef = gql`
  type Expense {
    id: String!
    title: String!
    description: String
    amount: String!
    date: String!
    recurring: Boolean!
    frequency: String
    endDate: String
    categories: [Category!]!
    payee: String
    accountId: String!
    userId: String!
  }

  input ExpenseInput {
    id: String
    title: String
    description: String
    amount: String
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
    addExpense(newExpense: ExpenseInput): Expense!
    updateExpense(expenseToUpdate: ExpenseInput): Expense
    deleteExpense(id: String): Expense
  }
`

export { typeDef as Expense }
