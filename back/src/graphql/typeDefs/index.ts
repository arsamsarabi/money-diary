import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Expense {
    id: String
    title: String
    description: String
    amount: Float
    categories: [String]
    date: String
    accountId: String
    userId: String
  }

  type Recurring {
    id: String
    title: String
    description: String
    amount: Float
    categories: [String]
    startDate: String
    endDate: String
    accountId: String
    userId: String
  }

  type Account {
    id: String
    name: String
    userId: String
    expenses: [Expense]!
    recurrings: [Recurring]!
    expenditureSumTotal: Float
    expenditureSumMonth: Float
    expenditureSum30Days: Float
  }

  type User {
    id: String
    name: String
    accounts: [Account]!
  }

  type Query {
    me(userId: String): User
    getAccountsByUserId(userId: String): [Account]!
    getExpensesByUserId(userId: String): [Expense]!
    getRecurringsByUserId(userId: String): [Recurring]!
  }

  input AccountInput {
    id: String
    name: String
    userId: String
  }

  input NewExpense {
    title: String
    description: String
    amount: Float
    startDate: String
    endDate: String
    categories: [String]
    accountId: String
    userId: String
  }

  type Mutation {
    addAccount(newAccount: AccountInput): Account
    updateAccount(accountToUpdate: AccountInput): Account
    addExpense(newExpense: NewExpense): Expense
  }
`

export default [typeDefs]
